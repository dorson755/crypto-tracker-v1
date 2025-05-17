import { motion } from "framer-motion";
import { Sparklines, SparklinesLine } from "react-sparklines";

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

export default function CryptoCard({ coin }: { coin: Coin }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
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
          <span className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold text-white">
            ${coin.current_price.toLocaleString()}
          </p>
          <motion.span
            className="text-sm font-medium"
            animate={{ 
              color: coin.price_change_percentage_24h >= 0 
                ? "#4ade80" 
                : "#f87171" 
            }}
          >
            {coin.price_change_percentage_24h >= 0 ? "▲" : "▼"}{" "}
            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
          </motion.span>
        </div>

        <Sparklines data={coin.sparkline_in_7d.price} width={100} height={40}>
          <SparklinesLine 
            color={coin.price_change_percentage_24h >= 0 ? "#4ade80" : "#f87171"} 
            style={{ strokeWidth: 2 }}
          />
        </Sparklines>
      </div>
    </motion.div>
  );
}