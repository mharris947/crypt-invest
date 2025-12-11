import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Clock,
  DollarSign,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketStatsProps {
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap: number;
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  subValue?: string;
  bgColor: string;
  isPositive?: boolean;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  subValue,
  bgColor,
  isPositive,
}: StatCardProps) => (
  <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-card to-card/50 border border-border/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
    {/* Animated gradient background */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-primary/5 via-transparent to-transparent" />

    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110",
            bgColor
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        {subValue && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-lg transition-colors",
              isPositive
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {isPositive ? "+" : ""}
            {subValue}%
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-2 font-medium">{label}</p>
      <p className="font-display text-3xl font-bold text-foreground tracking-tight">
        {value}
      </p>
    </div>
  </div>
);

export function MarketStats({
  price,
  change24h,
  high24h,
  low24h,
  volume24h,
  marketCap,
}: MarketStatsProps) {
  const isPositive = change24h >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <StatCard
        icon={DollarSign}
        label="Current Price"
        value={`${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
        subValue={change24h.toFixed(2)}
        bgColor="bg-gradient-to-br from-primary/20 to-primary/10 text-primary group-hover:from-primary/30 group-hover:to-primary/20"
        isPositive={isPositive}
      />

      <StatCard
        icon={TrendingUp}
        label="24h High"
        value={`$${high24h.toLocaleString("en-US", {
          maximumFractionDigits: 0,
        })}`}
        bgColor="bg-gradient-to-br from-success/20 to-success/10 text-success group-hover:from-success/30 group-hover:to-success/20"
      />

      <StatCard
        icon={TrendingDown}
        label="24h Low"
        value={`$${low24h.toLocaleString("en-US", {
          maximumFractionDigits: 0,
        })}`}
        bgColor="bg-gradient-to-br from-destructive/20 to-destructive/10 text-destructive group-hover:from-destructive/30 group-hover:to-destructive/20"
      />

      <StatCard
        icon={BarChart3}
        label="24h Volume"
        value={`$${(volume24h / 1e9).toFixed(2)}B`}
        bgColor="bg-gradient-to-br from-blue-500/20 to-blue-500/10 text-blue-500 group-hover:from-blue-500/30 group-hover:to-blue-500/20"
      />

      <StatCard
        icon={Activity}
        label="Market Cap"
        value={`$${(marketCap / 1e12).toFixed(2)}T`}
        bgColor="bg-gradient-to-br from-purple-500/20 to-purple-500/10 text-purple-500 group-hover:from-purple-500/30 group-hover:to-purple-500/20"
      />

      <StatCard
        icon={Clock}
        label="Last Updated"
        value="Just now"
        bgColor="bg-gradient-to-br from-amber-500/20 to-amber-500/10 text-amber-500 group-hover:from-amber-500/30 group-hover:to-amber-500/20"
      />
    </div>
  );
}
