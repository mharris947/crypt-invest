import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Bitcoin, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InvestFormProps {
  btcPrice: number;
}

export function InvestForm({ btcPrice }: InvestFormProps) {
  const [amount, setAmount] = useState("");
  const [isUSD, setIsUSD] = useState(true);
  const { toast } = useToast();

  const usdAmount = isUSD ? parseFloat(amount) || 0 : (parseFloat(amount) || 0) * btcPrice;
  const btcAmount = isUSD ? (parseFloat(amount) || 0) / btcPrice : parseFloat(amount) || 0;

  const handleInvest = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to invest.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Investment Successful!",
      description: `You have purchased ${btcAmount.toFixed(6)} BTC for $${usdAmount.toLocaleString()}`,
    });
    setAmount("");
  };

  const quickAmounts = [100, 500, 1000, 5000];

  return (
    <div className="p-6 rounded-xl bg-card border border-border card-shadow">
      <h3 className="font-display text-xl font-semibold text-foreground mb-6">Buy Bitcoin</h3>

      {/* Toggle USD/BTC */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={isUSD ? "default" : "outline"}
          onClick={() => setIsUSD(true)}
          className="flex-1 gap-2"
        >
          <DollarSign className="h-4 w-4" />
          USD
        </Button>
        <Button
          variant={!isUSD ? "default" : "outline"}
          onClick={() => setIsUSD(false)}
          className="flex-1 gap-2"
        >
          <Bitcoin className="h-4 w-4" />
          BTC
        </Button>
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label className="text-sm text-muted-foreground mb-2 block">Amount</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            {isUSD ? "$" : "₿"}
          </span>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="pl-8 h-14 text-lg font-medium"
          />
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {quickAmounts.map((qa) => (
          <Button
            key={qa}
            variant="outline"
            size="sm"
            onClick={() => {
              setIsUSD(true);
              setAmount(qa.toString());
            }}
          >
            ${qa}
          </Button>
        ))}
      </div>

      {/* Conversion Display */}
      <div className="p-4 rounded-lg bg-secondary/50 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">You will receive</span>
          <span className="font-display text-xl font-bold text-foreground">
            {btcAmount.toFixed(6)} BTC
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-muted-foreground">Total cost</span>
          <span className="font-medium text-foreground">
            ${usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Current Price */}
      <div className="flex justify-between items-center text-sm text-muted-foreground mb-6">
        <span>Current BTC Price</span>
        <span className="font-medium text-foreground">${btcPrice.toLocaleString()}</span>
      </div>

      {/* Submit Button */}
      <Button variant="hero" size="lg" className="w-full" onClick={handleInvest}>
        Buy Bitcoin
        <ArrowRight className="h-5 w-5" />
      </Button>

      <p className="text-xs text-muted-foreground text-center mt-4">
        By proceeding, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
