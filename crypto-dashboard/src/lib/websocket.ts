interface WebSocketMessage {
  type: string;
  id: string;
  price: number;
  price_change_percentage_24h: number;
}

export const setupWebSocket = (
  coinIds: string[],
  onUpdate: (id: string, price: number, percentage: number) => void
) => {
  const ws = new WebSocket('wss://ws.coingecko.com/api/v3');

  ws.onopen = () => {
    ws.send(JSON.stringify({
      type: 'watch',
      assets: coinIds,
      vs_currency: 'usd'
    }));
  };

  ws.onmessage = (event) => {
    try {
      const message: WebSocketMessage = JSON.parse(event.data);
      
      if (message.type === 'price_update') {
        onUpdate(message.id, message.price, message.price_change_percentage_24h);
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  return () => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.close();
    }
  };
};