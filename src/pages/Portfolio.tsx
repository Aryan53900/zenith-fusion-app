import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { useWeb3 } from "@/contexts/Web3Context";
import { Wallet, TrendingUp, TrendingDown, PieChart } from "lucide-react";

export default function Portfolio() {
  const { account } = useWeb3();

  // Mock portfolio data
  const [portfolio] = useState({
    totalValue: 12534.67,
    change24h: 5.23,
    tokens: [
      {
        symbol: "U2U",
        name: "U2U Network",
        balance: "1,234.56",
        value: 8234.12,
        change24h: 3.45,
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        balance: "2,500.00",
        value: 2500.00,
        change24h: 0.01,
      },
      {
        symbol: "WETH",
        name: "Wrapped Ether",
        balance: "0.85",
        value: 1800.55,
        change24h: -1.23,
      },
    ],
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Portfolio</h1>
            <p className="text-muted-foreground">
              Track your assets and performance across all chains
            </p>
          </div>

          {!account ? (
            <Card className="p-12 glass-card border-white/10 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center glow-primary">
                <Wallet className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Connect Your Wallet</h3>
              <p className="text-muted-foreground">
                Connect your wallet to view your portfolio
              </p>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Portfolio Overview */}
              <Card className="p-8 glass-card border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-sm text-muted-foreground mb-2">Total Balance</h2>
                    <div className="text-4xl font-bold">
                      ${portfolio.totalValue.toLocaleString()}
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    portfolio.change24h >= 0 ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                  }`}>
                    {portfolio.change24h >= 0 ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                    <span className="font-semibold">
                      {portfolio.change24h >= 0 ? '+' : ''}{portfolio.change24h}%
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="glass-card p-4 rounded-lg border border-white/10">
                    <div className="text-sm text-muted-foreground mb-1">Assets</div>
                    <div className="text-2xl font-semibold">{portfolio.tokens.length}</div>
                  </div>
                  <div className="glass-card p-4 rounded-lg border border-white/10">
                    <div className="text-sm text-muted-foreground mb-1">24h Volume</div>
                    <div className="text-2xl font-semibold">$3,450</div>
                  </div>
                  <div className="glass-card p-4 rounded-lg border border-white/10">
                    <div className="text-sm text-muted-foreground mb-1">Profit/Loss</div>
                    <div className="text-2xl font-semibold text-success">+$234.56</div>
                  </div>
                </div>
              </Card>

              {/* Token Holdings */}
              <Card className="p-6 glass-card border-white/10">
                <h3 className="text-lg font-semibold mb-4">Your Assets</h3>
                <div className="space-y-3">
                  {portfolio.tokens.map((token) => (
                    <div
                      key={token.symbol}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                          <PieChart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold">{token.symbol}</div>
                          <div className="text-sm text-muted-foreground">{token.name}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold">{token.balance}</div>
                        <div className="text-sm text-muted-foreground">
                          ${token.value.toLocaleString()}
                        </div>
                      </div>

                      <div className={`text-right min-w-[80px] ${
                        token.change24h >= 0 ? 'text-success' : 'text-destructive'
                      }`}>
                        <div className="font-semibold">
                          {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
