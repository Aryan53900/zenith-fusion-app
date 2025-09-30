import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SlippageSettingsProps {
  slippage: number;
  onSlippageChange: (value: number) => void;
  deadline: number;
  onDeadlineChange: (value: number) => void;
}

export default function SlippageSettings({
  slippage,
  onSlippageChange,
  deadline,
  onDeadlineChange,
}: SlippageSettingsProps) {
  const [customSlippage, setCustomSlippage] = useState(slippage.toString());

  const presetSlippages = [0.1, 0.5, 1.0];

  const handleSlippageSelect = (value: number) => {
    onSlippageChange(value);
    setCustomSlippage(value.toString());
  };

  const handleCustomSlippageChange = (value: string) => {
    setCustomSlippage(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 50) {
      onSlippageChange(numValue);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card border-white/10">
        <DialogHeader>
          <DialogTitle>Transaction Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Slippage Tolerance</Label>
            <div className="flex gap-2">
              {presetSlippages.map((preset) => (
                <Button
                  key={preset}
                  variant={slippage === preset ? "default" : "outline"}
                  onClick={() => handleSlippageSelect(preset)}
                  className={slippage === preset ? "gradient-primary" : "glass-card"}
                >
                  {preset}%
                </Button>
              ))}
              <div className="relative flex-1">
                <Input
                  type="number"
                  placeholder="Custom"
                  value={customSlippage}
                  onChange={(e) => handleCustomSlippageChange(e.target.value)}
                  className="pr-8 glass-card border-white/10"
                  step="0.1"
                  min="0"
                  max="50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  %
                </span>
              </div>
            </div>
            {slippage > 5 && (
              <p className="text-sm text-warning">
                High slippage tolerance may result in unfavorable trades
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Transaction Deadline</Label>
            <div className="relative">
              <Input
                type="number"
                value={deadline}
                onChange={(e) => onDeadlineChange(parseInt(e.target.value) || 20)}
                className="pr-20 glass-card border-white/10"
                min="1"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                minutes
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your transaction will revert if it is pending for more than this duration
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
