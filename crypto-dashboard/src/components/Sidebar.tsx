import React from 'react';
import {
  HomeIcon,
  ChartBarIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const icons = [
  { key: 'dash', Component: HomeIcon },
  { key: 'markets', Component: ChartBarIcon },
  { key: 'port', Component: Squares2X2Icon },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="text-2xl mb-8" style={{ color: '#B79F55' }}>
        💰
      </div>

      {/* Icons in squares */}
      {icons.map(({ key, Component }) => (
        <button key={key} className="icon-btn">
          <Component className="w-6 h-6 stroke-current" />
        </button>
      ))}

      <div className="flex-1" />

      <button className="icon-btn">
        <Cog6ToothIcon className="w-6 h-6 stroke-current" />
      </button>
    </aside>
  );
}
