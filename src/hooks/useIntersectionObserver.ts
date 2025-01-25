import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

export const useIntersectionObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 0.1
}: UseIntersectionObserverProps = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once the element is visible, we can stop observing it
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { root, rootMargin, threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [root, rootMargin, threshold]);

  return { elementRef, isVisible };
};