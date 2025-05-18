import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { useLiveCrypto, type Coin } from '../hooks/useLiveCrypto';

export default function CryptoGrid() {
  const coins: Coin[] = useLiveCrypto(6);

  return (
    <div className="p-6">
      <h2 className="text-xl font-serif text-gold mb-4">Market Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {coins.map((c) => (
          <div key={c.id} className="panel-card hover:shadow-[0_0_10px_rgba(183,159,85,0.5)] transition-all">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gold font-semibold">{c.name}</span>
              <span className="text-sm uppercase text-ivory/50">{c.symbol}</span>
            </div>
            <div className="text-2xl font-serif text-ivory mb-2">
              ${c.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className={`text-sm mb-2 ${
              c.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {c.price_change_percentage_24h >= 0 ? '▲' : '▼'}
              {Math.abs(c.price_change_percentage_24h).toFixed(2)}%
            </div>
            <Sparklines data={c.sparkline_in_7d.price} width={100} height={40}>
              <SparklinesLine style={{ stroke: '#B79F55', strokeWidth: 2 }} />
            </Sparklines>
          </div>
        ))}
      </div>
    </div>
  );
}
