import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

export interface TileCardProps {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  sparkline: number[];
}

export default function TileCard({
  name,
  symbol,
  price,
  change24h,
  sparkline,
}: TileCardProps) {
  const isPositive = change24h >= 0;

  return (
    <div className="panel-card hover:shadow-[0_0_10px_rgba(183,159,85,0.5)] transition">
      
      {/* ── HEADER with monogram, name, symbol & DIVIDER ── */}
      <div className="header flex items-center justify-between mb-4 pb-2 border-b border-gold/30">
        <div className="flex items-center">
          {/* ← Monogram icon via cryptocoins-icons */}
          <i className={`cc ${symbol.toUpperCase()} coin-icon`} />
          <span className="ml-2 text-gold font-semibold font-serif">{name}</span>
        </div>
        <span className="text-sm uppercase text-ivory/50">{symbol}</span>
      </div>

      {/* ── PRICE & % side‑by‑side ── */}
      <div className="flex items-baseline space-x-4 mb-4">
        <div className="price text-ivory font-serif">
          ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
        <div className={isPositive ? 'pct-positive' : 'pct-negative'}>
          {isPositive ? '▲' : '▼'} {Math.abs(change24h).toFixed(2)}%
        </div>
      </div>

      {/* ── Thin GOLD SPARKLINE ── */}
      <Sparklines data={sparkline} width={140} height={40} margin={4}>
        <SparklinesLine style={{ stroke: '#B79F55', strokeWidth: 1 }} />
      </Sparklines>
    </div>
  );
}
