import axios from "axios";

export const fetchCryptoData = async () => {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10"
  );
  return data;
};