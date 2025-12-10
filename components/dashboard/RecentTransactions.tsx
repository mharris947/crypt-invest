import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  type: "buy" | "sell";
  amount: number;
  btcAmount: number;
  date: string;
  status: "completed" | "pending";
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border card-shadow">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Recent Transactions</h3>
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                tx.type === "buy" ? "bg-success/10" : "bg-destructive/10"
              )}>
                {tx.type === "buy" ? (
                  <ArrowUpRight className="h-5 w-5 text-success" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-destructive" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground capitalize">{tx.type} Bitcoin</p>
                <p className="text-sm text-muted-foreground">{tx.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-foreground">
                {tx.type === "buy" ? "-" : "+"}${tx.amount.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                {tx.btcAmount.toFixed(6)} BTC
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
