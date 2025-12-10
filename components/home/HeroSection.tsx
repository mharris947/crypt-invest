"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(35_100%_50%/0.1),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-sm text-muted-foreground">Bitcoin is up 12.5% this week</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Invest in{" "}
            <span className="text-gradient">Bitcoin</span>
            <br />
            with Confidence
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Start your crypto journey with the world's most trusted Bitcoin investment platform. 
            Secure, simple, and built for the future.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link href="/invest">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Start Investing
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/market">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                View Market
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <StatCard icon={TrendingUp} label="Trading Volume" value="$2.5B+" />
            <StatCard icon={Shield} label="Assets Protected" value="$10B+" />
            <StatCard icon={Zap} label="Active Users" value="500K+" />
          </div>
        </div>
      </div>

      {/* Floating Bitcoin Animation */}
      <div className="absolute right-10 top-1/3 hidden xl:block animate-float opacity-20">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x="50" y="55" textAnchor="middle" fontSize="24" fill="hsl(var(--primary))" fontWeight="bold">₿</text>
        </svg>
      </div>
    </section>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border card-shadow">
      <Icon className="h-8 w-8 text-primary mb-3 mx-auto" />
      <div className="font-display text-2xl font-bold text-foreground mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
