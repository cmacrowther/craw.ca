"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TypewriterEffectProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  loop?: boolean;
  cursorChar?: string;
  className?: string;
}

export function TypewriterEffect({
  strings,
  typeSpeed = 40,
  backSpeed = 25,
  backDelay = 2200,
  loop = true,
  cursorChar = "_",
  className,
}: TypewriterEffectProps) {
  const [text, setText] = useState("");

  // Refs to hold mutable state without triggering re-renders until necessary
  const state = useRef({
    textIndex: 0,
    charIndex: 0,
    isDeleting: false,
    lastTime: 0,
    isWaiting: false,
    waitStartTime: 0,
  });

  const requestRef = useRef<number>(0);

  useEffect(() => {
    // Reset state when strings change
    state.current = {
      textIndex: 0,
      charIndex: 0,
      isDeleting: false,
      lastTime: 0,
      isWaiting: false,
      waitStartTime: 0,
    };
    setText("");

    const animate = (time: number) => {
      const s = state.current;

      // Initialize lastTime
      if (!s.lastTime) s.lastTime = time;

      // Calculate delta
      const delta = time - s.lastTime;

      // Determine current target speed
      let targetSpeed = s.isDeleting ? backSpeed : typeSpeed;

      // Handling waiting period before backspacing
      if (s.isWaiting) {
        if (time - s.waitStartTime > backDelay) {
          s.isWaiting = false;
          s.isDeleting = true;
          s.lastTime = time; // Reset timer for deletion
        }
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      // If enough time has passed, process the next character
      if (delta >= targetSpeed) {
        const currentString = strings[s.textIndex % strings.length];

        if (s.isDeleting) {
          // Deleting
          if (s.charIndex > 0) {
            s.charIndex--;
            setText(currentString.substring(0, s.charIndex));
          } else {
            // Finished deleting
            s.isDeleting = false;
            s.textIndex++;
            if (!loop && s.textIndex >= strings.length) {
              // Stop if not looping and reached end
              return;
            }
          }
        } else {
          // Typing
          if (s.charIndex < currentString.length) {
            s.charIndex++;
            setText(currentString.substring(0, s.charIndex));
          } else {
            // Finished typing string
            if (!loop && s.textIndex >= strings.length - 1) {
              return;
            }
            // start waiting
            s.isWaiting = true;
            s.waitStartTime = time;
          }
        }

        s.lastTime = time;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
    // Re-run effect only if strings content changes, not the array reference
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strings.join('|'), typeSpeed, backSpeed, backDelay, loop]);

  // Cursor blinking effect using CSS would be lighter, but let's do a simple interval here
  // or just use CSS animation. CSS is better for performance.

  return (
    <span className={cn("inline-block", className)}>
      <span>{text}</span>
      <span className="animate-blink ml-1">{cursorChar}</span>
      <style jsx>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-blink {
          animation: blink 0.7s infinite;
        }
      `}</style>
    </span>
  );
}
