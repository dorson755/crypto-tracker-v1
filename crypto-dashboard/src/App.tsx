import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CryptoGrid from './components/CryptoGrid';
import { useLiveCrypto } from './hooks/useLiveCrypto';
import { fetchUserLocation } from './api/geolocation';
import './index.css';

export default function App() {
  useLiveCrypto(6); // ensure hook runs
  const [city, setCity] = useState('the web');

  useEffect(() => {
    fetchUserLocation().then((loc) => {
      if (loc.city) setCity(loc.city);
    });
  }, []);

  return (
    <div className="flex h-screen bg-richBg text-ivory">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-auto">
        <Header city={city} />
        <CryptoGrid />
      </main>
    </div>
  );
}
