import { Bitcoin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Bitcoin className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold text-foreground">
              BitVault
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 BitVault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
