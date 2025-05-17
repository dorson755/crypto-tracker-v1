import axios from "axios";

export interface Coin {
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

export const fetchCryptoData = async (): Promise<Coin[]> => {
  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          sparkline: true
        }
      }
    );

    if (!Array.isArray(data)) {
      throw new Error("API returned invalid data format");
    }

    return data.map(coin => ({
      ...coin,
      sparkline_in_7d: {
        price: coin.sparkline_in_7d?.price || []
      }
    }));
  } catch (error) {
    console.error("Crypto API error:", error);
    return [];
  }
};