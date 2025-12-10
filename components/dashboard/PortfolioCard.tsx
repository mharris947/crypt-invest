import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  totalValue: number;
  btcAmount: number;
  change24h: number;
  btcPrice: number;
}

export function PortfolioCard({ totalValue, btcAmount, change24h, btcPrice }: PortfolioCardProps) {
  const isPositive = change24h >= 0;

  return (
    <div className="p-6 rounded-xl bg-gradient-card border border-border card-shadow">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h2>
        </div>
        <div className={cn(
          "flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium",
          isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
        )}>
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {isPositive ? "+" : ""}{change24h.toFixed(2)}%
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-secondary/50">
          <p className="text-xs text-muted-foreground mb-1">BTC Holdings</p>
          <p className="font-display text-lg font-semibold text-foreground">
            {btcAmount.toFixed(6)} BTC
          </p>
        </div>
        <div className="p-4 rounded-lg bg-secondary/50">
          <p className="text-xs text-muted-foreground mb-1">BTC Price</p>
          <p className="font-display text-lg font-semibold text-foreground">
            ${btcPrice.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
