import { Card } from "@/components/ui/card";
import { TrendingUp, Zap, AlertTriangle } from "lucide-react";
import { Token } from "@/config/tokens";

interface PriceQuotePanelProps {
  tokenIn: Token;
  tokenOut: Token;
  amountIn: string;
  amountOut: string;
  bestRoute: string | null;
  slippage: number;
}

export default function PriceQuotePanel({
  tokenIn,
  tokenOut,
  amountIn,
  amountOut,
  bestRoute,
  slippage,
}: PriceQuotePanelProps) {
  const rate = parseFloat(amountOut) / parseFloat(amountIn);
  const minReceived = parseFloat(amountOut) * (1 - slippage / 100);
  const priceImpact = (Math.random() * 0.5).toFixed(2); // Simulated price impact

  return (
    <Card className="p-6 glass-card border-white/10 space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-accent" />
        <h3 className="font-semibold">Quote Details</h3>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Rate</span>
          <span className="font-medium">
            1 {tokenIn.symbol} = {rate.toFixed(6)} {tokenOut.symbol}
          </span>
        </div>

        {bestRoute && (
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Best Route</span>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                {bestRoute}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Price Impact</span>
          <span className={`font-medium ${parseFloat(priceImpact) > 1 ? "text-warning" : "text-success"}`}>
            <TrendingUp className="w-4 h-4 inline mr-1" />
            {priceImpact}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Minimum Received</span>
          <span className="font-medium">
            {minReceived.toFixed(6)} {tokenOut.symbol}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Slippage Tolerance</span>
          <span className="font-medium">{slippage}%</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Network Fee</span>
          <span className="font-medium">~$0.50</span>
        </div>
      </div>

      {parseFloat(priceImpact) > 1 && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20">
          <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-semibold text-warning">High Price Impact</div>
            <div className="text-muted-foreground">
              This swap has a price impact of {priceImpact}%. Consider breaking it into smaller trades.
            </div>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-white/10">
        <div className="text-sm text-muted-foreground">
          <p>Prices are estimated. You will receive at least {minReceived.toFixed(6)} {tokenOut.symbol} or the transaction will revert.</p>
        </div>
      </div>
    </Card>
  );
}
