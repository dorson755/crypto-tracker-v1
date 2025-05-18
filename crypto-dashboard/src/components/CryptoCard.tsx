import React from "react";

interface CryptoCardProps {
  name: string;
  symbol: string;
  price: number;
  change: number;
}

export const CryptoCard = ({ name, symbol, price, change }: CryptoCardProps) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p className="uppercase">{symbol}</p>
      <p className="text-xl">${price.toLocaleString()}</p>
      <p className={change >= 0 ? "text-green-500" : "text-red-500"}>
        {change.toFixed(2)}%
      </p>
    </div>
  );
};
