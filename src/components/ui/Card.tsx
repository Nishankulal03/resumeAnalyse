import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg backdrop-blur-sm bg-opacity-90 p-6 ${className}`}>
      {children}
    </div>
  );
}