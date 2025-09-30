import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Droplets } from "lucide-react";

export default function Liquidity() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Liquidity Pools</h1>
            <p className="text-muted-foreground">
              Provide liquidity and earn fees on your crypto assets
            </p>
          </div>

          <Card className="p-12 glass-card border-white/10 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center glow-primary">
              <Droplets className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Liquidity Coming Soon</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We're working on bringing liquidity pool functionality to the platform. 
              Soon you'll be able to provide liquidity and earn trading fees.
            </p>
            <Button className="gradient-primary glow-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Liquidity (Coming Soon)
            </Button>
          </Card>

          {/* Feature Preview */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Card className="p-6 glass-card border-white/10">
              <h3 className="text-lg font-semibold mb-2">Earn Trading Fees</h3>
              <p className="text-muted-foreground text-sm">
                Earn a share of trading fees proportional to your liquidity contribution
              </p>
            </Card>
            <Card className="p-6 glass-card border-white/10">
              <h3 className="text-lg font-semibold mb-2">Multiple Pool Options</h3>
              <p className="text-muted-foreground text-sm">
                Choose from various token pairs and fee tiers to optimize your returns
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
