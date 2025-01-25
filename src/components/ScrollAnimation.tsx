import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation: 'fade-in-section' | 'slide-in-left' | 'slide-in-right' | 'scale-in' | 'stagger-children';
  className?: string;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation,
  className = ''
}) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={elementRef}
      className={`${animation} ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};