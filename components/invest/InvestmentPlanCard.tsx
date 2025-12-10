import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Percent, ArrowRight } from "lucide-react";

export interface InvestmentPlan {
  id: string;
  name: string;
  minInvestment: number;
  maxInvestment: number;
  returnRate: number;
  duration: string;
  durationDays: number;
  description: string;
  features: string[];
  popular?: boolean;
}

interface InvestmentPlanCardProps {
  plan: InvestmentPlan;
  onSelect: (plan: InvestmentPlan) => void;
}

export function InvestmentPlanCard({ plan, onSelect }: InvestmentPlanCardProps) {
  return (
    <div
      className={`relative p-6 rounded-xl bg-card border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
        plan.popular ? "border-primary shadow-lg shadow-primary/10" : "border-border"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
          Most Popular
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </div>

      <div className="flex items-center justify-center gap-1 mb-6">
        <span className="font-display text-5xl font-bold text-primary">{plan.returnRate}%</span>
        <span className="text-muted-foreground text-sm">return</span>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">Investment Range</span>
          </div>
          <span className="font-medium text-foreground text-sm">
            ${plan.minInvestment.toLocaleString()} - ${plan.maxInvestment.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Duration</span>
          </div>
          <span className="font-medium text-foreground text-sm">{plan.duration}</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Percent className="h-4 w-4" />
            <span className="text-sm">Daily Return</span>
          </div>
          <span className="font-medium text-foreground text-sm">
            {(plan.returnRate / plan.durationDays).toFixed(2)}%
          </span>
        </div>
      </div>

      <ul className="space-y-2 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant="hero"
        className="w-full"
        onClick={() => onSelect(plan)}
      >
        Invest Now
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
