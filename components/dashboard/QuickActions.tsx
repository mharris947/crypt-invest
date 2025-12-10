import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, RefreshCw, Send } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  return (
    <div className="p-6 rounded-xl bg-card border border-border card-shadow">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <Link href="/invest">
          <Button variant="default" className="w-full gap-2">
            <ArrowUpRight className="h-4 w-4" />
            Buy
          </Button>
        </Link>
        <Button variant="outline" className="w-full gap-2">
          <ArrowDownRight className="h-4 w-4" />
          Sell
        </Button>
        <Button variant="outline" className="w-full gap-2">
          <Send className="h-4 w-4" />
          Send
        </Button>
        <Button variant="outline" className="w-full gap-2">
          <RefreshCw className="h-4 w-4" />
          Swap
        </Button>
      </div>
    </div>
  );
}
