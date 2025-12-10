import { TrendingUp, TrendingDown, BarChart3, Clock, DollarSign, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketStatsProps {
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap: number;
}

export function MarketStats({ price, change24h, high24h, low24h, volume24h, marketCap }: MarketStatsProps) {
  const isPositive = change24h >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="p-6 rounded-xl bg-card border border-border card-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm text-muted-foreground">Current Price</span>
        </div>
        <div className="flex items-end gap-3">
          <span className="font-display text-2xl font-bold text-foreground">
            ${price.toLocaleString()}
          </span>
          <span className={cn(
            "flex items-center gap-1 text-sm font-medium pb-1",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {isPositive ? "+" : ""}{change24h.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-card border border-border card-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-success" />
          </div>
          <span className="text-sm text-muted-foreground">24h High</span>
        </div>
        <span className="font-display text-2xl font-bold text-foreground">
          ${high24h.toLocaleString()}
        </span>
      </div>

      <div className="p-6 rounded-xl bg-card border border-border card-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
            <TrendingDown className="h-5 w-5 text-destructive" />
          </div>
          <span className="text-sm text-muted-foreground">24h Low</span>
        </div>
        <span className="font-display text-2xl font-bold text-foreground">
          ${low24h.toLocaleString()}
        </span>
      </div>

      <div className="p-6 rounded-xl bg-card border border-border card-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm text-muted-foreground">24h Volume</span>
        </div>
        <span className="font-display text-2xl font-bold text-foreground">
          ${(volume24h / 1e9).toFixed(2)}B
        </span>
      </div>

      <div className="p-6 rounded-xl bg-card border border-border card-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm text-muted-foreground">Market Cap</span>
        </div>
        <span className="font-display text-2xl font-bold text-foreground">
          ${(marketCap / 1e12).toFixed(2)}T
        </span>
      </div>

      <div className="p-6 rounded-xl bg-card border border-border card-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm text-muted-foreground">Last Updated</span>
        </div>
        <span className="font-display text-lg font-bold text-foreground">
          Just now
        </span>
      </div>
    </div>
  );
}
