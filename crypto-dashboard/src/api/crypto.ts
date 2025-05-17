import axios from "axios";


export const fetchCryptoData = async () => {
  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&sparkline=true"
    );
    return data;
  } catch (error) {
    console.error("Crypto API error:", error);
    return [];
  }
};