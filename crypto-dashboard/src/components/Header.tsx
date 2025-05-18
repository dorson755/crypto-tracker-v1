import React from 'react';

export default function Header({ city }: { city: string }) {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-richPanel border-b border-panelBorder">
      <h1 className="text-4xl font-serif text-gold">Hello from {city}</h1>
      <span className="text-sm uppercase tracking-wide text-ivory/70">
        {new Date().toLocaleDateString(undefined, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </span>
    </header>
  );
}
