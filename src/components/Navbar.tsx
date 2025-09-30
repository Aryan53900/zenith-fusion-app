import { Link, useLocation } from "react-router-dom";
import { Wallet, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/contexts/Web3Context";

export default function Navbar() {
  const location = useLocation();
  const { account, connectWallet, disconnectWallet, isConnecting } = useWeb3();

  const isActive = (path: string) => location.pathname === path;

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center glow-primary group-hover:scale-110 transition-transform">
              <ArrowRightLeft className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              DexAggregator
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button
                variant="ghost"
                className={isActive("/") ? "bg-primary/20 text-primary" : ""}
              >
                Swap
              </Button>
            </Link>
            <Link to="/liquidity">
              <Button
                variant="ghost"
                className={isActive("/liquidity") ? "bg-primary/20 text-primary" : ""}
              >
                Liquidity
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button
                variant="ghost"
                className={isActive("/portfolio") ? "bg-primary/20 text-primary" : ""}
              >
                Portfolio
              </Button>
            </Link>
            <Link to="/history">
              <Button
                variant="ghost"
                className={isActive("/history") ? "bg-primary/20 text-primary" : ""}
              >
                History
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {account ? (
              <>
                <div className="hidden sm:block px-4 py-2 rounded-lg glass-card text-sm font-medium">
                  {formatAddress(account)}
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  size="sm"
                  className="border-destructive/50 text-destructive hover:bg-destructive/10"
                >
                  Disconnect
                </Button>
              </>
            ) : (
              <Button
                onClick={connectWallet}
                disabled={isConnecting}
                className="gradient-primary glow-primary"
              >
                <Wallet className="w-4 h-4 mr-2" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
