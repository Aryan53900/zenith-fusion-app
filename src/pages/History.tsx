import { useState } from "react";
import { ExternalLink, ArrowUpRight, Clock, CheckCircle2, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/contexts/Web3Context";

interface Transaction {
  id: string;
  type: "swap";
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut: string;
  status: "success" | "pending" | "failed";
  timestamp: Date;
  txHash: string;
}

export default function History() {
  const { account } = useWeb3();
  
  // Mock transaction data
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "swap",
      tokenIn: "U2U",
      tokenOut: "USDC",
      amountIn: "1.5",
      amountOut: "2,345.67",
      status: "success",
      timestamp: new Date(Date.now() - 3600000),
      txHash: "0x1234...5678",
    },
    {
      id: "2",
      type: "swap",
      tokenIn: "USDC",
      tokenOut: "DAI",
      amountIn: "1000",
      amountOut: "999.45",
      status: "success",
      timestamp: new Date(Date.now() - 7200000),
      txHash: "0xabcd...efgh",
    },
    {
      id: "3",
      type: "swap",
      tokenIn: "WETH",
      tokenOut: "UNI",
      amountIn: "0.5",
      amountOut: "125.32",
      status: "pending",
      timestamp: new Date(Date.now() - 300000),
      txHash: "0x9876...4321",
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "pending":
        return <Clock className="w-5 h-5 text-warning animate-spin" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return null;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Transaction History</h1>
            <p className="text-muted-foreground">
              View all your swap transactions and their status
            </p>
          </div>

          {!account ? (
            <Card className="p-12 glass-card border-white/10 text-center">
              <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-muted-foreground">
                Connect your wallet to view your transaction history
              </p>
            </Card>
          ) : transactions.length === 0 ? (
            <Card className="p-12 glass-card border-white/10 text-center">
              <h3 className="text-xl font-semibold mb-2">No Transactions Yet</h3>
              <p className="text-muted-foreground">
                Your swap transactions will appear here
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <Card key={tx.id} className="p-6 glass-card border-white/10 hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {getStatusIcon(tx.status)}
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">
                            Swap {tx.amountIn} {tx.tokenIn}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold">
                            {tx.amountOut} {tx.tokenOut}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{formatTimestamp(tx.timestamp)}</span>
                          <span>•</span>
                          <span className="font-mono">{tx.txHash}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-4"
                      onClick={() => window.open(`https://u2uscan.xyz/tx/${tx.txHash}`, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
