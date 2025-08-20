"use client";

import { useEffect, useRef } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  delay?: number;
  stagger?: number;
  duration?: number;
  easing?: string;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    threshold = 0.1,
    delay = 0,
    stagger = 50,
    duration = 800,
    easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === 'undefined') return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }

    // Lazy load Splitting.js only when needed and supported
    let Splitting: any = null;
    const loadSplitting = async () => {
      try {
        const module = await import('splitting');
        Splitting = module.default;
        
        // Initialize Splitting.js on text elements
        const textElements = element.querySelectorAll('[data-splitting]');
        if (textElements.length > 0 && Splitting) {
          Splitting({ target: textElements });
        }
      } catch (error) {
        // Fallback if splitting fails to load - just show content
        element.style.opacity = '1';
        element.style.transform = 'none';
        return;
      }
    };

    // Set initial states for animations
    const animateElements = element.querySelectorAll('[data-animate]');
    animateElements.forEach((el: any) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
    });

    // Set initial states for slide animations
    const slideLeftElements = element.querySelectorAll('.animate-slide-left');
    slideLeftElements.forEach((el: any) => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-30px)';
      el.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
    });

    const slideRightElements = element.querySelectorAll('.animate-slide-right');
    slideRightElements.forEach((el: any) => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(30px)';
      el.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
    });

    const scaleElements = element.querySelectorAll('.animate-scale-in');
    scaleElements.forEach((el: any) => {
      el.style.opacity = '0';
      el.style.transform = 'scale(0.9)';
      el.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
    });

    const fadeDownElements = element.querySelectorAll('.animate-fade-down');
    fadeDownElements.forEach((el: any) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-20px)';
      el.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
    });

    // Use Intersection Observer for performance
    let hasBeenTriggered = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBeenTriggered) {
            hasBeenTriggered = true;
            
            // Load and initialize splitting.js if needed
            const hasTextElements = element.querySelectorAll('[data-splitting]').length > 0;
            if (hasTextElements) {
              loadSplitting();
            }

            // Trigger animations with stagger
            setTimeout(() => {
              animateElements.forEach((el: any, index: number) => {
                setTimeout(() => {
                  el.style.opacity = '1';
                  el.style.transform = 'translateY(0)';
                }, index * stagger);
              });

              slideLeftElements.forEach((el: any, index: number) => {
                setTimeout(() => {
                  el.style.opacity = '1';
                  el.style.transform = 'translateX(0)';
                }, index * stagger);
              });

              slideRightElements.forEach((el: any, index: number) => {
                setTimeout(() => {
                  el.style.opacity = '1';
                  el.style.transform = 'translateX(0)';
                }, index * stagger);
              });

              scaleElements.forEach((el: any, index: number) => {
                setTimeout(() => {
                  el.style.opacity = '1';
                  el.style.transform = 'scale(1)';
                }, index * stagger);
              });

              fadeDownElements.forEach((el: any, index: number) => {
                setTimeout(() => {
                  el.style.opacity = '1';
                  el.style.transform = 'translateY(0)';
                }, index * stagger);
              });
            }, delay);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, delay, stagger, duration, easing]);

  return ref;
}

// Utility function for staggered animations
export function useStaggeredAnimation(options: UseScrollAnimationOptions & { 
  childSelector?: string;
} = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    threshold = 0.1,
    delay = 0,
    stagger = 50,
    duration = 800,
    easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    childSelector = '[data-stagger]'
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === 'undefined') return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const children = element.querySelectorAll(childSelector);
      children.forEach((child: any) => {
        child.style.opacity = '1';
        child.style.transform = 'none';
      });
      return;
    }

    const children = element.querySelectorAll(childSelector);
    
    // Set initial states
    children.forEach((child: any) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(20px)';
      child.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
    });

    let hasBeenTriggered = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBeenTriggered) {
            hasBeenTriggered = true;
            
            setTimeout(() => {
              children.forEach((child: any, index: number) => {
                setTimeout(() => {
                  child.style.opacity = '1';
                  child.style.transform = 'translateY(0)';
                }, index * stagger);
              });
            }, delay);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, delay, stagger, duration, easing, childSelector]);

  return ref;
}
