import { motion } from "framer-motion";
import { Sparklines, SparklinesLine } from "react-sparklines";

export default function CryptoCard({ coin, location }: { 
  coin: Coin;
  location: LocationData;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      className="glass-card p-4 rounded-lg cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-4">
        <img 
          src={coin.image} 
          alt={coin.name} 
          className="w-8 h-8"
          loading="lazy"
        />
        <div>
          <h3 className="text-white font-semibold">{coin.name}</h3>
          <span className="text-gray-400 text-sm">
            {coin.symbol.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <span className="text-2xl font-bold">
          ${coin.current_price.toLocaleString()}
        </span>
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            coin.price_change_percentage_24h >= 0
              ? "bg-green-900/30 text-green-400"
              : "bg-red-900/30 text-red-400"
          }`}
        >
          {coin.price_change_percentage_24h >= 0 ? "▲" : "▼"}{" "}
          {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        </span>
      </div>

      <Sparklines data={coin.sparkline_in_7d.price} width={100} height={40}>
        <SparklinesLine 
          color={coin.price_change_percentage_24h >= 0 ? "#4ade80" : "#f87171"} 
          style={{ strokeWidth: 2 }}
        />
      </Sparklines>
    </motion.div>
  );
}

// Type definitions
interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  sparkline_in_7d: {
    price: number[];
  };
}

interface LocationData {
  city?: string;
  country?: string;
  currency?: string;
}