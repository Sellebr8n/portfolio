'use client';
import React from 'react';

type Props = { id: string; children: React.ReactNode };

const ScrollIntoView = ({ id, children }: Props) => {
  const scroll = () => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <button onClick={scroll} className="px-4 py-2 flex items-center justify-center">
      {children}
    </button>
  );
};

export default ScrollIntoView;
