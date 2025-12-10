import { Lock, LineChart, Wallet, Clock, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "Your assets are protected with military-grade encryption and multi-signature technology.",
  },
  {
    icon: LineChart,
    title: "Real-Time Analytics",
    description: "Track your portfolio performance with advanced charts and market insights.",
  },
  {
    icon: Wallet,
    title: "Instant Deposits",
    description: "Fund your account instantly with multiple payment methods including bank transfer and cards.",
  },
  {
    icon: Clock,
    title: "24/7 Trading",
    description: "Trade Bitcoin anytime, anywhere. Our platform never sleeps so you never miss an opportunity.",
  },
  {
    icon: Shield,
    title: "Insurance Protected",
    description: "Your investments are backed by comprehensive insurance coverage for peace of mind.",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Manage your investments on the go with our fully responsive platform.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-secondary/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-gradient">BitVault</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We provide everything you need to invest in Bitcoin safely and profitably.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 card-shadow hover:glow-primary"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
