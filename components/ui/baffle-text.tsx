"use client";

import { useEffect, useRef, useState } from "react";

interface BaffleTextProps {
  text: string;
  className?: string;
  speed?: number;
  characters?: string;
  revealDuration?: number;
  revealDelay?: number;
  children?: React.ReactNode;
  variant?: "pill" | "title" | "description";
}

export function BaffleText({
  text,
  className = "",
  speed = 75,
  characters = "█▓▒░/<>{}[]()_+=~`!@#$%^&*<.?/#",
  revealDuration = 1000,
  revealDelay = 0,
  children,
  variant,
}: BaffleTextProps) {
  const [displayText, setDisplayText] = useState("");
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const hasAnimatedRef = useRef(false);

  // Only apply baffle effect to specific variants
  const shouldApplyBaffle = variant === "pill" || variant === "title" || variant === "description";

  // Initialize display text on mount
  useEffect(() => {
    if (shouldApplyBaffle) {
      // Start with scrambled text immediately
      setDisplayText(text.replace(/\S/g, () => 
        characters[Math.floor(Math.random() * characters.length)]
      ));
    } else {
      setDisplayText(text);
    }
  }, [text, characters, shouldApplyBaffle]);

  // Cleanup function
  const cleanup = () => {
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = null;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          
          if (shouldApplyBaffle) {
            // Start continuous scrambling
            animationRef.current = setInterval(() => {
              setDisplayText(text.replace(/\S/g, () => 
                characters[Math.floor(Math.random() * characters.length)]
              ));
            }, speed);
            
            // Move to reveal phase after delay
            setTimeout(() => {
              cleanup();
              
              let currentIndex = 0;
              const revealSpeed = Math.max(revealDuration / text.length, 50);
              
              animationRef.current = setInterval(() => {
                currentIndex++;
                
                if (currentIndex >= text.length) {
                  setDisplayText(text);
                  cleanup();
                  return;
                }
                
                const revealed = text.slice(0, currentIndex);
                const unrevealed = text.slice(currentIndex).replace(/\S/g, () => 
                  characters[Math.floor(Math.random() * characters.length)]
                );
                setDisplayText(revealed + unrevealed);
              }, revealSpeed);
              
            }, revealDelay);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px -50px 0px",
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      cleanup();
    };
  }, [text, characters, speed, revealDelay, revealDuration, shouldApplyBaffle]);

  return (
    <div ref={elementRef} className={className}>
      <span>
        {displayText}
      </span>
      {children}
    </div>
  );
}
