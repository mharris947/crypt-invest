// import { useQuery } from "@tanstack/react-query";

// interface BitcoinPrice {
//   usd: number;
//   usd_24h_change: number;
//   usd_24h_vol: number;
//   usd_market_cap: number;
// }

// interface BitcoinMarketData {
//   price: number;
//   change24h: number;
//   high24h: number;
//   low24h: number;
//   volume24h: number;
//   marketCap: number;
// }

// interface PriceHistoryPoint {
//   date: string;
//   price: number;
// }

// export function useBitcoinPrice() {
//   return useQuery({
//     queryKey: ["bitcoin-price"],
//     queryFn: async (): Promise<BitcoinPrice> => {
//       const response = await fetch(
//         "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true"
//       );
//       if (!response.ok) throw new Error("Failed to fetch Bitcoin price");
//       const data = await response.json();
//       return {
//         usd: data.bitcoin.usd,
//         usd_24h_change: data.bitcoin.usd_24h_change,
//         usd_24h_vol: data.bitcoin.usd_24h_vol,
//         usd_market_cap: data.bitcoin.usd_market_cap,
//       };
//     },
//     refetchInterval: 60000, // Refetch every minute
//     staleTime: 30000,
//   });
// }

// export function useBitcoinMarketData() {
//   return useQuery({
//     queryKey: ["bitcoin-market"],
//     queryFn: async (): Promise<BitcoinMarketData> => {
//       const response = await fetch(
//         "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&community_data=false&developer_data=false"
//       );
//       if (!response.ok) throw new Error("Failed to fetch Bitcoin market data");
//       const data = await response.json();
//       return {
//         price: data.market_data.current_price.usd,
//         change24h: data.market_data.price_change_percentage_24h,
//         high24h: data.market_data.high_24h.usd,
//         low24h: data.market_data.low_24h.usd,
//         volume24h: data.market_data.total_volume.usd,
//         marketCap: data.market_data.market_cap.usd,
//       };
//     },
//     refetchInterval: 60000,
//     staleTime: 30000,
//   });
// }

// export function useBitcoinPriceHistory(days: number = 7) {
//   return useQuery({
//     queryKey: ["bitcoin-history", days],
//     queryFn: async (): Promise<PriceHistoryPoint[]> => {
//       const response = await fetch(
//         `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`
//       );
//       if (!response.ok) throw new Error("Failed to fetch Bitcoin price history");
//       const data = await response.json();
      
//       // Sample the data to get reasonable number of points
//       const prices = data.prices as [number, number][];
//       const interval = Math.max(1, Math.floor(prices.length / 20));
      
//       return prices
//         .filter((_, index) => index % interval === 0)
//         .map(([timestamp, price]) => {
//           const date = new Date(timestamp);
//           if (days <= 1) {
//             return { date: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), price };
//           } else if (days <= 7) {
//             return { date: date.toLocaleDateString([], { weekday: 'short' }), price };
//           } else {
//             return { date: date.toLocaleDateString([], { month: 'short', day: 'numeric' }), price };
//           }
//         });
//     },
//     refetchInterval: 300000, // Refetch every 5 minutes
//     staleTime: 120000,
//   });
// }
