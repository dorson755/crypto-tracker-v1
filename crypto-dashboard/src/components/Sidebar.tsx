import React from 'react';
import {
  HomeIcon,
  ChartBarIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  return (
    <aside className="sidebar w-20 min-h-screen border-r border-panelBorder flex flex-col items-center py-6 space-y-6">
      <div className="text-gold text-2xl font-serif">C</div>
      <button className="hover:text-gold">
        <HomeIcon className="w-6 h-6" />
      </button>
      <button className="hover:text-gold">
        <ChartBarIcon className="w-6 h-6" />
      </button>
      <button className="hover:text-gold">
        <Squares2X2Icon className="w-6 h-6" />
      </button>
      <button className="mt-auto hover:text-gold">
        <Cog6ToothIcon className="w-6 h-6" />
      </button>
    </aside>
  );
}
