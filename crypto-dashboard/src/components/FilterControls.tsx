import { motion } from "framer-motion";

export default function FilterControls({
  activeFilter,
  setActiveFilter,
}: {
  activeFilter: "all" | "gainers" | "losers";
  setActiveFilter: (filter: "all" | "gainers" | "losers") => void;
}) {
  return (
    <div className="flex gap-2 mb-4">
      {(["all", "gainers", "losers"] as const).map((filter) => (
        <motion.button
          key={filter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full ${
            activeFilter === filter
              ? "bg-purple-500/30 text-purple-300"
              : "bg-gray-800/50 hover:bg-gray-700/50"
          }`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </motion.button>
      ))}
    </div>
  );
}