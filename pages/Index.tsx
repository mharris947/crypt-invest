import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bitcoin } from "lucide-react";
import Link from "next/link";

const Index = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      
      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative p-12 rounded-2xl bg-gradient-card border border-border overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-3xl" />
            
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <Bitcoin className="h-16 w-16 text-primary mx-auto mb-6 animate-float" />
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Ready to Start Your Bitcoin Journey?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Join thousands of investors who trust BitVault for their Bitcoin investments. 
                Start with as little as $10.
              </p>
              <Link href="/invest">
                <Button variant="hero" size="xl">
                  Get Started Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
