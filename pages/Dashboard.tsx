"use client"

import { PortfolioCard } from "@/components/dashboard/PortfolioCard";
import { PriceChart } from "@/components/dashboard/PriceChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";

// Mock data
const priceData = [
  { date: "Jan", price: 42000 },
  { date: "Feb", price: 44500 },
  { date: "Mar", price: 48000 },
  { date: "Apr", price: 45000 },
  { date: "May", price: 52000 },
  { date: "Jun", price: 58000 },
  { date: "Jul", price: 62000 },
  { date: "Aug", price: 65000 },
  { date: "Sep", price: 63000 },
  { date: "Oct", price: 68000 },
  { date: "Nov", price: 72000 },
  { date: "Dec", price: 95400 },
];

const transactions = [
  {
    id: "1",
    type: "buy" as const,
    amount: 5000,
    btcAmount: 0.052445,
    date: "Dec 8, 2024",
    status: "completed" as const,
  },
  {
    id: "2",
    type: "buy" as const,
    amount: 2500,
    btcAmount: 0.026223,
    date: "Dec 5, 2024",
    status: "completed" as const,
  },
  {
    id: "3",
    type: "sell" as const,
    amount: 1000,
    btcAmount: 0.010489,
    date: "Dec 1, 2024",
    status: "completed" as const,
  },
  {
    id: "4",
    type: "buy" as const,
    amount: 10000,
    btcAmount: 0.10489,
    date: "Nov 28, 2024",
    status: "completed" as const,
  },
];

const Dashboard = () => {
  const btcPrice = 95400;
  const btcAmount = 0.523456;
  const totalValue = btcAmount * btcPrice;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your portfolio overview.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <PortfolioCard
            totalValue={totalValue}
            btcAmount={btcAmount}
            change24h={3.45}
            btcPrice={btcPrice}
          />
          <PriceChart data={priceData} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <QuickActions />
          <RecentTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
