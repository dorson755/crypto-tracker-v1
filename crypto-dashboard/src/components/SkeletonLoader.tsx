import { motion } from "framer-motion";

export default function SkeletonLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card p-4 rounded-lg h-36 space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse" />
        <div className="h-4 bg-gray-700 rounded w-1/3 animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-6 bg-gray-700 rounded w-1/2 animate-pulse" />
        <div className="h-4 bg-gray-700 rounded w-1/4 animate-pulse" />
      </div>
    </motion.div>
  );
}