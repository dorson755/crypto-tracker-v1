import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCryptoData } from "./api/crypto";
import { fetchUserLocation } from "./api/geolocation";
import CryptoCard from "./components/CryptoCard";
import SkeletonLoader from "./components/SkeletonLoader";

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

export default function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [location, setLocation] = useState<{ city?: string; country?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cryptoData, locationData] = await Promise.all([
          fetchCryptoData(),
          fetchUserLocation()
        ]);
        
        setCoins(cryptoData);
        setLocation(locationData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex items-center justify-center">
        <div className="glass-card p-6 text-red-400 text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Geolocation Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-6 mb-6 rounded-xl"
        >
          <h1 className="text-3xl font-bold text-white">
            {loading ? "Loading location..." : `Hello from ${location?.city || "the web"}!`}
          </h1>
        </motion.div>

        {/* Crypto Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {loading ? (
              Array(6).fill(0).map((_, i) => <SkeletonLoader key={i} />)
            ) : (
              coins.map((coin) => <CryptoCard key={coin.id} coin={coin} />)
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}