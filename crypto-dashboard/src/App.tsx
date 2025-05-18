// src/App.tsx
import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterControls from './components/FilterControls';
import CryptoCard from './components/CryptoCard';
import LoadingSkeleton from './components/LoadingSkeleton';
import { useLiveCrypto, type Coin } from './hooks/useLiveCrypto';
import { fetchUserLocation } from './api/geolocation';

interface LocationData {
  city?: string;
  country?: string;
}

export default function App() {
  const coins = useLiveCrypto(10);             // ← initial + live updates
  const [location, setLocation] = useState<LocationData>({});
  const [activeFilter, setActiveFilter] = useState<'all' | 'gainers' | 'losers'>('all');
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [locError, setLocError] = useState('');

  // Fetch user location once
  useEffect(() => {
    fetchUserLocation()
      .then(loc => setLocation(loc))
      .catch(err => setLocError(err.message))
      .finally(() => setLoadingLocation(false));
  }, []);

  // Apply gainers/losers filter
  const filtered = useMemo(() => {
    return coins.filter(c => {
      if (activeFilter === 'gainers') return c.price_change_percentage_24h > 0;
      if (activeFilter === 'losers')  return c.price_change_percentage_24h < 0;
      return true;
    });
  }, [coins, activeFilter]);

  // Render error if location fails
  if (locError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex items-center justify-center p-4">
        <div className="glass-card p-6 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Location Error</h2>
          <p>{locError}</p>
          <button
            className="mt-4 px-4 py-2 bg-purple-500/30 rounded hover:bg-purple-500/50"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6 rounded-xl"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
            {loadingLocation
              ? 'Detecting your location…'
              : `Hello from ${location.city || 'the web'}!`}
          </h1>
        </motion.div>

        {/* Filter buttons */}
        <FilterControls
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Coins grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {coins.length === 0
              ? Array(6).fill(0).map((_, i) => <LoadingSkeleton key={i} />)
              : filtered.map((coin: Coin) => (
                  <CryptoCard key={coin.id} coin={coin} location={location} />
                ))
            }
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
