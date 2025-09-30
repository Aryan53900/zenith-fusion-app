import { useState, useEffect } from "react";
import { ArrowDown, Settings, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import TokenSelector from "./TokenSelector";
import PriceQuotePanel from "./PriceQuotePanel";
import SlippageSettings from "./SlippageSettings";
import { Token } from "@/config/tokens";
import { useWeb3 } from "@/contexts/Web3Context";
import { getTokenBalance, approveToken, checkAllowance, executeSwapV2 } from "@/lib/web3";
import { DEX_ROUTERS } from "@/config/contract";

export default function SwapWidget() {
  const { account } = useWeb3();
  const [tokenIn, setTokenIn] = useState<Token | null>(null);
  const [tokenOut, setTokenOut] = useState<Token | null>(null);
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const [slippage, setSlippage] = useState(0.5);
  const [deadline, setDeadline] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [balanceIn, setBalanceIn] = useState("0");
  const [balanceOut, setBalanceOut] = useState("0");
  const [needsApproval, setNeedsApproval] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [bestRoute, setBestRoute] = useState<string | null>(null);

  // Fetch balances
  useEffect(() => {
    if (account && tokenIn) {
      getTokenBalance(tokenIn.address, account).then(setBalanceIn);
    }
  }, [account, tokenIn]);

  useEffect(() => {
    if (account && tokenOut) {
      getTokenBalance(tokenOut.address, account).then(setBalanceOut);
    }
  }, [account, tokenOut]);

  // Check approval status
  useEffect(() => {
    if (account && tokenIn && amountIn && parseFloat(amountIn) > 0) {
      if (tokenIn.address === "0x0000000000000000000000000000000000000000") {
        setNeedsApproval(false);
      } else {
        checkAllowance(tokenIn.address, account, tokenIn.decimals).then((allowance) => {
          setNeedsApproval(parseFloat(allowance) < parseFloat(amountIn));
        });
      }
    }
  }, [account, tokenIn, amountIn]);

  // Simulate price quote (in production, this would call actual DEX APIs)
  useEffect(() => {
    if (tokenIn && tokenOut && amountIn && parseFloat(amountIn) > 0) {
      // Simulate API call delay
      const timer = setTimeout(() => {
        const mockRate = 1.05 + Math.random() * 0.1;
        setAmountOut((parseFloat(amountIn) * mockRate).toFixed(6));
        setBestRoute("UniswapV2");
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setAmountOut("");
      setBestRoute(null);
    }
  }, [tokenIn, tokenOut, amountIn]);

  const handleSwapTokens = () => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
    setAmountIn(amountOut);
    setAmountOut(amountIn);
  };

  const handleApprove = async () => {
    if (!tokenIn || !amountIn) return;
    
    setIsApproving(true);
    try {
      const success = await approveToken(tokenIn.address, amountIn, tokenIn.decimals);
      if (success) {
        toast.success("Token approved successfully!");
        setNeedsApproval(false);
      } else {
        toast.error("Approval failed");
      }
    } catch (error) {
      toast.error("Approval failed");
    } finally {
      setIsApproving(false);
    }
  };

  const handleSwap = async () => {
    if (!tokenIn || !tokenOut || !amountIn || !amountOut || !account) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const minAmountOut = (parseFloat(amountOut) * (1 - slippage / 100)).toFixed(6);
      const deadlineTimestamp = Math.floor(Date.now() / 1000) + deadline * 60;
      
      const path = [tokenIn.address, tokenOut.address];
      
      await executeSwapV2(
        DEX_ROUTERS.UNISWAP_V2,
        amountIn,
        minAmountOut,
        path,
        deadlineTimestamp,
        tokenIn.decimals,
        tokenOut.decimals
      );
      
      toast.success("Swap executed successfully!");
      setAmountIn("");
      setAmountOut("");
      
      // Refresh balances
      getTokenBalance(tokenIn.address, account).then(setBalanceIn);
      getTokenBalance(tokenOut.address, account).then(setBalanceOut);
    } catch (error: any) {
      toast.error(error.message || "Swap failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 glass-card border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Swap</h2>
          <SlippageSettings
            slippage={slippage}
            onSlippageChange={setSlippage}
            deadline={deadline}
            onDeadlineChange={setDeadline}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">From</span>
            {account && tokenIn && (
              <span className="text-muted-foreground">
                Balance: {parseFloat(balanceIn).toFixed(4)}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.0"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
              className="flex-1 text-2xl h-16 glass-card border-white/10"
            />
            <TokenSelector
              selectedToken={tokenIn}
              onSelectToken={setTokenIn}
              label="Select token"
            />
          </div>
          {account && tokenIn && parseFloat(amountIn) > parseFloat(balanceIn) && (
            <div className="flex items-center gap-2 text-destructive text-sm">
              <AlertCircle className="w-4 h-4" />
              Insufficient balance
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            size="icon"
            variant="outline"
            onClick={handleSwapTokens}
            className="rounded-full glass-card hover:bg-white/10 hover:rotate-180 transition-all duration-300"
          >
            <ArrowDown className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">To</span>
            {account && tokenOut && (
              <span className="text-muted-foreground">
                Balance: {parseFloat(balanceOut).toFixed(4)}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.0"
              value={amountOut}
              readOnly
              className="flex-1 text-2xl h-16 glass-card border-white/10 bg-white/5"
            />
            <TokenSelector
              selectedToken={tokenOut}
              onSelectToken={setTokenOut}
              label="Select token"
            />
          </div>
        </div>

        {account ? (
          <div className="space-y-2">
            {needsApproval && (
              <Button
                onClick={handleApprove}
                disabled={isApproving}
                className="w-full h-14 text-lg gradient-accent"
              >
                {isApproving ? "Approving..." : `Approve ${tokenIn?.symbol}`}
              </Button>
            )}
            <Button
              onClick={handleSwap}
              disabled={
                isLoading ||
                needsApproval ||
                !tokenIn ||
                !tokenOut ||
                !amountIn ||
                parseFloat(amountIn) > parseFloat(balanceIn)
              }
              className="w-full h-14 text-lg gradient-primary glow-primary"
            >
              {isLoading ? "Swapping..." : "Swap"}
            </Button>
          </div>
        ) : (
          <Button disabled className="w-full h-14 text-lg">
            Connect Wallet to Swap
          </Button>
        )}
      </Card>

      {tokenIn && tokenOut && amountIn && amountOut && (
        <PriceQuotePanel
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          amountIn={amountIn}
          amountOut={amountOut}
          bestRoute={bestRoute}
          slippage={slippage}
        />
      )}
    </div>
  );
}
