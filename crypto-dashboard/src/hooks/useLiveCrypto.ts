// src/hooks/useLiveCrypto.ts
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Re‑use your Coin interface
export interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  sparkline_in_7d: { price: number[] };
}

/**
 * Fetches initial coin data from CoinGecko and then opens a
 * WebSocket to Binance for live price updates.
 *
 * @param perPage  Number of top coins to load (defaults to 10)
 * @returns        Array of Coin objects with real‑time current_price
 */
export function useLiveCrypto(perPage = 10) {
  const [coins, setCoins] = useState<Coin[]>([]);
  const wsRef = useRef<WebSocket | null>(null);  // ← Initialized to null

  // 1) Initial fetch via CoinGecko
  useEffect(() => {
    let cancelled = false;
    axios
      .get<Coin[]>('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: perPage,
          sparkline: true,
        },
      })
      .then((res) => {
        if (!cancelled) {
          setCoins(
            res.data.map((c) => ({
              ...c,
              sparkline_in_7d: { price: c.sparkline_in_7d?.price || [] },
            }))
          );
        }
      })
      .catch((err) => console.error('Fetch error:', err));

    return () => {
      cancelled = true;
    };
  }, [perPage]);

  // 2) WebSocket via Binance combined streams
  useEffect(() => {
    if (coins.length === 0) return;

    const streams = coins
      .map((c) => `${c.symbol.toLowerCase()}usdt@ticker`)
      .join('/');
    const endpoint = `wss://stream.binance.com:9443/stream?streams=${streams}`;
    const ws = new WebSocket(endpoint);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Binance WS connected to:', endpoint);
    };

    ws.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data);
        const d = msg.data;
        const sym = d.s.slice(0, -4).toLowerCase(); // strip 'USDT'
        const price = parseFloat(d.c);
        const pct24h = parseFloat(d.P);
        setCoins((prev) =>
          prev.map((coin) =>
            coin.symbol === sym
              ? { ...coin, current_price: price, price_change_percentage_24h: pct24h }
              : coin
          )
        );
      } catch (e) {
        console.error('WS parse error', e);
      }
    };

    ws.onerror = (e) => console.error('WebSocket error:', e);
    ws.onclose = () => console.log('Binance WS disconnected');

    return () => {
      ws.close();
    };
  }, [coins.map((c) => c.symbol).join(',')]);

  return coins;
}
