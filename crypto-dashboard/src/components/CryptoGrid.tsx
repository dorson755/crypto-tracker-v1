import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { useLiveCrypto, type Coin } from '../hooks/useLiveCrypto';

export default function CryptoGrid() {
  const coins: Coin[] = useLiveCrypto(6);

  return (
    <div className="px-6 flex-1 overflow-auto">
      {/* Integrated header */}
      <div className="app-header">
        <h1>Hello from {new Date().toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}</h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coins.map((c) => (
          <div key={c.id} className="panel-card hover:shadow-[0_0_10px_rgba(183,159,85,0.5)] transition">
            {/* Header with logo, name, symbol */}
            <div className="header">
              <div className="flex items-center">
                <img src={c.image} alt={c.name} className="coin-logo" />
                <span className="text-[#B79F55] font-semibold">{c.name}</span>
              </div>
              <span className="text-sm uppercase text-ivory/50">{c.symbol}</span>
            </div>

            {/* Price */}
            <div className="price">${c.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>

            {/* 24h Change */}
            <div className={c.price_change_percentage_24h >= 0 ? 'pct-positive' : 'pct-negative'}>
              {c.price_change_percentage_24h >= 0 ? '▲' : '▼'}{Math.abs(c.price_change_percentage_24h).toFixed(2)}%
            </div>

            {/* Sparkline (thin gold line) */}
            <div className="mt-4">
              <Sparklines data={c.sparkline_in_7d.price} width={120} height={40} margin={4}>
                <SparklinesLine style={{ stroke: '#B79F55', strokeWidth: 1 }} />
              </Sparklines>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
