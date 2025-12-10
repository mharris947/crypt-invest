"use client";

import { useState } from "react";
import {
  InvestmentPlanCard,
  InvestmentPlan,
} from "@/components/invest/InvestmentPlanCard";
import { InvestmentModal } from "@/components/invest/InvestmentModal";
import { Shield, Clock, Zap, TrendingUp } from "lucide-react";

const investmentPlans: InvestmentPlan[] = [
  {
    id: "starter",
    name: "Starter Plan",
    minInvestment: 100,
    maxInvestment: 4999,
    returnRate: 15,
    duration: "7 Days",
    durationDays: 7,
    description: "Perfect for beginners exploring Bitcoin investment",
    features: ["24/7 Support", "Daily Updates", "Instant Withdrawals"],
  },
  {
    id: "growth",
    name: "Growth Plan",
    minInvestment: 5000,
    maxInvestment: 24999,
    returnRate: 35,
    duration: "14 Days",
    durationDays: 14,
    description: "Accelerate your portfolio with higher returns",
    features: [
      "Priority Support",
      "Real-time Analytics",
      "Compound Interest",
      "Risk Protection",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Plan",
    minInvestment: 25000,
    maxInvestment: 99999,
    returnRate: 55,
    duration: "21 Days",
    durationDays: 21,
    description: "Maximum returns for serious investors",
    features: [
      "Dedicated Manager",
      "Advanced Analytics",
      "Insurance Coverage",
      "VIP Benefits",
      "Early Access",
    ],
  },
  {
    id: "elite",
    name: "Elite Plan",
    minInvestment: 100000,
    maxInvestment: 500000,
    returnRate: 85,
    duration: "30 Days",
    durationDays: 30,
    description: "Exclusive tier for high-net-worth investors",
    features: [
      "Personal Advisor",
      "Custom Strategies",
      "Full Insurance",
      "Priority Payouts",
      "Exclusive Events",
      "Tax Support",
    ],
  },
];

const features = [
  {
    icon: Shield,
    title: "Secure & Insured",
    description: "All investments protected by comprehensive insurance",
  },
  {
    icon: Clock,
    title: "Flexible Terms",
    description: "Choose plans that fit your investment timeline",
  },
  {
    icon: TrendingUp,
    title: "High Returns",
    description: "Industry-leading returns on Bitcoin investments",
  },
  {
    icon: Zap,
    title: "Fast Payouts",
    description: "Receive your returns instantly upon maturity",
  },
];

const Invest = () => {
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectPlan = (plan: InvestmentPlan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Investment Plans
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the perfect investment plan that matches your goals. Start
            earning today with our secure Bitcoin investment platform.
          </p>
        </div>

        {/* Features Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">
                  {feature.title}
                </h4>
                <p className="text-xs text-muted-foreground hidden md:block">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Investment Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {investmentPlans.map((plan) => (
            <InvestmentPlanCard
              key={plan.id}
              plan={plan}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-card border border-border">
              <h4 className="font-medium text-foreground mb-2">
                How do I get started?
              </h4>
              <p className="text-sm text-muted-foreground">
                Simply select a plan, fill in your details, and make your
                deposit. Returns start accumulating immediately.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border">
              <h4 className="font-medium text-foreground mb-2">
                When do I receive returns?
              </h4>
              <p className="text-sm text-muted-foreground">
                Returns are paid out automatically once the investment period
                ends. You can withdraw instantly.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border">
              <h4 className="font-medium text-foreground mb-2">
                Is my investment secure?
              </h4>
              <p className="text-sm text-muted-foreground">
                Yes, all investments are protected by our comprehensive
                insurance policy and stored in cold wallets.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border">
              <h4 className="font-medium text-foreground mb-2">
                Can I invest in multiple plans?
              </h4>
              <p className="text-sm text-muted-foreground">
                Absolutely! You can diversify your portfolio by investing in
                multiple plans simultaneously.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      <InvestmentModal
        plan={selectedPlan}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
};

export default Invest;
