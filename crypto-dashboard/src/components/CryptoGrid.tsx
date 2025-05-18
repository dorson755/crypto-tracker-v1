import { useLiveCrypto, type Coin } from '../hooks/useLiveCrypto';
import TileCard from './TileCard';

export default function CryptoGrid() {
  const coins: Coin[] = useLiveCrypto(6);
  return (
    <div className="flex-1 overflow-auto px-6 py-4">
      <h2 className="text-xl font-serif text-gold mb-6">Market Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coins.map(c=>(
          <TileCard
            key={c.id}
            name={c.name}
            symbol={c.symbol}
            price={c.current_price}
            change24h={c.price_change_percentage_24h}
            sparkline={c.sparkline_in_7d.price}
          />
        ))}
      </div>
    </div>
  );
}
