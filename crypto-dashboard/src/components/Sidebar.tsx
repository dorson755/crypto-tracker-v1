import {
  HomeIcon,
  ChartBarIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  return (
    <aside
      className="
        w-20
        min-h-screen
        p-4
        bg-richPanel
        flex flex-col items-center gap-6

        /* ← Added gold lining on right edge: */
        border-r-2 border-gold
      "
    >
      {[HomeIcon, ChartBarIcon, Squares2X2Icon].map((Icon, i) => (
        <button
          key={i}
          className="
            w-12 h-12 flex items-center justify-center
            bg-richPanel border border-[#3A473F] rounded
            transition hover:bg-[#3A473F]
          "
        >
          <Icon className="w-6 h-6 text-gold" />
        </button>
      ))}
      <div className="flex-1" />
      <button className="
        w-12 h-12 flex items-center justify-center
        bg-richPanel border border-[#3A473F] rounded
        transition hover:bg-[#3A473F]
      ">
        <Cog6ToothIcon className="w-6 h-6 text-gold" />
      </button>
    </aside>
  );
}
