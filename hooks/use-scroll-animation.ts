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

    // Dynamically import Splitting only on client side
    let Splitting: any = null;
    import('splitting').then((module) => {
      Splitting = module.default;
      
      // Initialize Splitting.js on text elements
      const textElements = element.querySelectorAll('[data-splitting]');
      if (textElements.length > 0 && Splitting) {
        Splitting({ target: textElements });
      }
    }).catch(() => {
      // Fallback if splitting fails to load
      console.warn('Splitting.js failed to load');
    });

    // Set initial states for animations - hide elements that should be animated
    const animateElements = element.querySelectorAll('[data-animate]');
    animateElements.forEach((el) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = `all ${duration}ms ${easing}`;
    });

    // Set initial states for slide animations
    const slideLeftElements = element.querySelectorAll('.animate-slide-left');
    slideLeftElements.forEach((el) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateX(-50px)';
      element.style.transition = `all ${duration}ms ${easing}`;
    });

    const slideRightElements = element.querySelectorAll('.animate-slide-right');
    slideRightElements.forEach((el) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateX(50px)';
      element.style.transition = `all ${duration}ms ${easing}`;
    });

    const scaleElements = element.querySelectorAll('.animate-scale-in');
    scaleElements.forEach((el) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'scale(0.8)';
      element.style.transition = `all ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
    });

    // Set initial states for fade-down animations (top to bottom)
    const fadeDownElements = element.querySelectorAll('.animate-fade-down');
    fadeDownElements.forEach((el) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(-30px)'; // Start from above
      element.style.transition = `all ${duration}ms ${easing}`;
    });

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            
            // Add base animation class
            target.classList.add('animate-in');
            
            // Animate split text if present
            const splitElements = target.querySelectorAll('.char, .word, .line');
            if (splitElements.length > 0) {
              splitElements.forEach((el, index) => {
                const element = el as HTMLElement;
                element.style.transitionDelay = `${delay + (index * stagger)}ms`;
                element.style.transitionDuration = `${duration}ms`;
                element.style.transitionTimingFunction = easing;
                element.classList.add('char-animate-in');
              });
            }
            
            // Animate data-animate elements
            const childElements = target.querySelectorAll('[data-animate]');
            childElements.forEach((el, index) => {
              const element = el as HTMLElement;
              const animationDelay = delay + (index * stagger);
              
              setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
              }, animationDelay);
            });

            // Animate slide elements
            const slideLeft = target.querySelectorAll('.animate-slide-left');
            slideLeft.forEach((el, index) => {
              const element = el as HTMLElement;
              const animationDelay = delay + (index * stagger * 2);
              
              setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
              }, animationDelay);
            });

            const slideRight = target.querySelectorAll('.animate-slide-right');
            slideRight.forEach((el, index) => {
              const element = el as HTMLElement;
              const animationDelay = delay + (index * stagger * 2);
              
              setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
              }, animationDelay);
            });

            const scale = target.querySelectorAll('.animate-scale-in');
            scale.forEach((el, index) => {
              const element = el as HTMLElement;
              const animationDelay = delay + (index * stagger * 2);
              
              setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
              }, animationDelay);
            });

            // Animate fade-down elements
            const fadeDown = target.querySelectorAll('.animate-fade-down');
            fadeDown.forEach((el, index) => {
              const element = el as HTMLElement;
              const animationDelay = delay + (index * stagger);
              
              setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
              }, animationDelay);
            });
            
            // Stop observing once animated
            observer.unobserve(target);
          }
        });
      },
      { threshold, rootMargin: '50px' }
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
    stagger = 100,
    duration = 600,
    easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    childSelector = '[data-stagger]'
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Use a small delay to hide elements after initial render
    const timer = setTimeout(() => {
      const staggerElements = element.querySelectorAll(childSelector);
      staggerElements.forEach((el) => {
        (el as HTMLElement).classList.add('will-animate');
      });
    }, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const children = target.querySelectorAll(childSelector);
            
            children.forEach((child, index) => {
              const el = child as HTMLElement;
              const animationDelay = delay + (index * stagger);
              
              setTimeout(() => {
                el.style.transitionDuration = `${duration}ms`;
                el.style.transitionTimingFunction = easing;
                el.classList.remove('will-animate');
                el.classList.add('stagger-animate-in');
              }, animationDelay);
            });
            
            observer.unobserve(target);
          }
        });
      },
      { threshold, rootMargin: '100px' }
    );

    observer.observe(element);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [threshold, delay, stagger, duration, easing, childSelector]);

  return ref;
}
