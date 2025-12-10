"use client"

export const dynamic = "force-dynamic";

import { MarketStats } from "@/components/market/MarketStats";
import { PriceChart } from "@/components/PriceChart";
import { Bitcoin } from "lucide-react";
import {
  useBitcoinMarketData,
  useBitcoinPriceHistory,
} from "@/hooks/useBitcoinData";
import { Skeleton } from "@/components/ui/skeleton";

export default function MarketPage() {
  const { data: marketData, isLoading: isMarketLoading } =
    useBitcoinMarketData();
  const { data: historyData, isLoading: isHistoryLoading } =
    useBitcoinPriceHistory(1);

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
        {isHistoryLoading ? (
          <Skeleton className="h-80 w-full rounded-xl" />
        ) : (
          <PriceChart data={historyData || []} />
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