import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "@/contexts/Web3Context";
import Navbar from "@/components/Navbar";
import SwapWidget from "@/components/SwapWidget";
import { TrendingUp, Shield, Zap } from "lucide-react";

export default function Index() {
  const { account } = useWeb3();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent animate-float">
              Trade Smarter, Not Harder
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get the best prices across multiple DEXs with our advanced aggregation technology
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Swap Widget */}
            <div className="lg:col-span-2">
              <SwapWidget />
            </div>

            {/* Features Sidebar */}
            <div className="space-y-4">
              <div className="glass-card p-6 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Best Prices</h3>
                    <p className="text-sm text-muted-foreground">Always</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  We scan multiple DEXs to find you the best possible rate for every trade
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Lightning Fast</h3>
                    <p className="text-sm text-muted-foreground">Execution</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Optimized routing ensures your swaps execute quickly with minimal slippage
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure & Safe</h3>
                    <p className="text-sm text-muted-foreground">Non-custodial</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your funds never leave your wallet. Trade with confidence and security
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-xl border border-white/10 text-center">
              <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                $2.5B+
              </div>
              <div className="text-muted-foreground mt-2">Total Volume</div>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10 text-center">
              <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                500K+
              </div>
              <div className="text-muted-foreground mt-2">Total Trades</div>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10 text-center">
              <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                10+
              </div>
              <div className="text-muted-foreground mt-2">Integrated DEXs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
