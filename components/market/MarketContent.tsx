"use client";

import { MarketStats } from "@/components/market/MarketStats";
import { PriceChart } from "@/components/PriceChart";
import { Bitcoin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

interface MarketDataType {
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap: number;
}

interface ChartDataType {
  date: string;
  price: number;
}

export function MarketContent() {
  const [marketData, setMarketData] = useState<MarketDataType | null>(null);
  const [chartData, setChartData] = useState<ChartDataType[]>([]);
  const [isMarketLoading, setIsMarketLoading] = useState(true);
  const [isChartLoading, setIsChartLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsMarketLoading(true);
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin?vs_currency=usd&include_market_data=true"
        );
        const data = await response.json();

        setMarketData({
          price: data.market_data.current_price.usd,
          change24h: data.market_data.price_change_percentage_24h,
          high24h: data.market_data.high_24h.usd,
          low24h: data.market_data.low_24h.usd,
          volume24h: data.market_data.total_volume.usd,
          marketCap: data.market_data.market_cap.usd,
        });
      } catch (error) {
        console.error("Failed to fetch market data:", error);
      } finally {
        setIsMarketLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setIsChartLoading(true);
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
        );
        const data = await response.json();

        const formattedData = data.prices.map((price: [number, number]) => ({
          date: new Date(price[0]).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          price: Math.round(price[1]),
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      } finally {
        setIsChartLoading(false);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Bitcoin className="h-8 w-8 text-primary" />
          </div>
          <div className="absolute inset-0 blur-xl bg-primary/20 animate-pulse-glow" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Bitcoin
          </h1>
          <p className="text-muted-foreground">BTC/USD • Cryptocurrency</p>
        </div>
      </div>

      {/* Market Stats */}
      <div className="mb-8">
        {isMarketLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        ) : (
          <MarketStats
            price={marketData?.price ?? 0}
            change24h={marketData?.change24h ?? 0}
            high24h={marketData?.high24h ?? 0}
            low24h={marketData?.low24h ?? 0}
            volume24h={marketData?.volume24h ?? 0}
            marketCap={marketData?.marketCap ?? 0}
          />
        )}
      </div>

      {/* Price Chart */}
      <div className="mb-8">
        {isChartLoading ? (
          <Skeleton className="h-80 w-full rounded-xl" />
        ) : chartData.length > 0 ? (
          <PriceChart data={chartData} />
        ) : (
          <div className="p-6 rounded-xl bg-card border border-border">
            <p className="text-muted-foreground">No chart data available</p>
          </div>
        )}
      </div>

      {/* Market Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-card border border-border card-shadow">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            About Bitcoin
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Bitcoin is the first and most well-known cryptocurrency, created in
            2009 by an anonymous person or group known as Satoshi Nakamoto. It
            operates on a decentralized network using blockchain technology,
            allowing peer-to-peer transactions without the need for
            intermediaries.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border card-shadow">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            Key Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Circulating Supply</span>
              <span className="font-medium text-foreground">19.6M BTC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Max Supply</span>
              <span className="font-medium text-foreground">21M BTC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">All-Time High</span>
              <span className="font-medium text-foreground">$103,647</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">All-Time Low</span>
              <span className="font-medium text-foreground">$67.81</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}