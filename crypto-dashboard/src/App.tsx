import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCryptoData } from "./api/crypto";
import { fetchUserLocation } from "./api/geolocation";
import { setupWebSocket } from "./lib/websocket";
import CryptoCard from "./components/CryptoCard";
import FilterControls from "./components/FilterControls";
import LoadingSkeleton from "./components/LoadingSkeleton";

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
}

export default function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [location, setLocation] = useState<LocationData>({});
  const [activeFilter, setActiveFilter] = useState<"all" | "gainers" | "losers">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // WebSocket updates handler
  const handlePriceUpdate = useCallback((id: string, price: number, percentage: number) => {
    setCoins(prev => prev.map(coin => 
      coin.id === id ? { 
        ...coin, 
        current_price: price,
        price_change_percentage_24h: percentage
      } : coin
    ));
  }, []);

  useEffect(() => {
  let cleanupWs: () => void;

  const initializeData = async () => {
    try {
      const [cryptoData, locationData] = await Promise.all([
        fetchCryptoData(),
        fetchUserLocation()
      ]);

      if (cryptoData.length === 0) {
        throw new Error("Failed to load cryptocurrency data");
      }

      setCoins(cryptoData);
      setLocation(locationData);
      setLoading(false);

      // Initialize WebSocket after data load
      const coinIds = cryptoData.slice(0, 5).map(c => c.id);
      cleanupWs = setupWebSocket(coinIds, handlePriceUpdate);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      setLoading(false);
    }
  };

  initializeData();

  // Cleanup function
  return () => {
    if (cleanupWs) {
      cleanupWs();
    }
  };
}, [handlePriceUpdate]);

  const filteredCoins = useMemo(() => 
    coins.filter(coin => {
      if (activeFilter === "gainers") return coin.price_change_percentage_24h >= 0;
      if (activeFilter === "losers") return coin.price_change_percentage_24h < 0;
      return true;
    }),
  [coins, activeFilter]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex items-center justify-center p-4">
        <div className="glass-card p-6 text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-4">⚠️ Error</h2>
          <p className="mb-4">{error}</p>
          <button
            className="px-4 py-2 bg-purple-500/30 rounded hover:bg-purple-500/50"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6 rounded-xl"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
            {loading ? "Loading..." : `Hello from ${location.city || "the web"}!`}
          </h1>
        </motion.div>

        <FilterControls 
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {loading ? (
              Array(6).fill(0).map((_, i) => <LoadingSkeleton key={i} />)
            ) : (
              filteredCoins.map(coin => (
                <CryptoCard key={coin.id} coin={coin} location={location} />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}