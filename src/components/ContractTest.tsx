import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Loader2, Info } from "lucide-react";
import { useWeb3 } from "@/contexts/Web3Context";
import { getSwapHelperContract, getRouterAddress } from "@/lib/web3";
import { SWAP_HELPER_ADDRESS, DEX_ROUTERS } from "@/config/contract";
import { toast } from "sonner";

interface TestResult {
  name: string;
  status: "pending" | "success" | "error";
  message?: string;
}

export default function ContractTest() {
  const { account, chainId } = useWeb3();
  const [isTestingContract, setIsTestingContract] = useState(false);
  const [tests, setTests] = useState<TestResult[]>([]);

  const runContractTests = async () => {
    if (!account) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsTestingContract(true);
    const testResults: TestResult[] = [];

    // Test 1: Contract deployment
    try {
      testResults.push({ name: "Contract Address Verification", status: "pending" });
      setTests([...testResults]);

      const contract = await getSwapHelperContract();
      if (contract.target === SWAP_HELPER_ADDRESS) {
        testResults[0] = {
          name: "Contract Address Verification",
          status: "success",
          message: `Contract deployed at ${SWAP_HELPER_ADDRESS}`,
        };
      } else {
        testResults[0] = {
          name: "Contract Address Verification",
          status: "error",
          message: "Contract address mismatch",
        };
      }
    } catch (error: any) {
      testResults[0] = {
        name: "Contract Address Verification",
        status: "error",
        message: error.message || "Failed to connect to contract",
      };
    }
    setTests([...testResults]);

    // Test 2: Check router configuration for UniswapV2
    try {
      testResults.push({ name: "UniswapV2 Router Configuration", status: "pending" });
      setTests([...testResults]);

      const uniswapV2Router = await getRouterAddress(DEX_ROUTERS.UNISWAP_V2);
      if (uniswapV2Router && uniswapV2Router !== "0x0000000000000000000000000000000000000000") {
        testResults[1] = {
          name: "UniswapV2 Router Configuration",
          status: "success",
          message: `Router: ${uniswapV2Router}`,
        };
      } else {
        testResults[1] = {
          name: "UniswapV2 Router Configuration",
          status: "error",
          message: "UniswapV2 router not configured",
        };
      }
    } catch (error: any) {
      testResults[1] = {
        name: "UniswapV2 Router Configuration",
        status: "error",
        message: error.message || "Failed to check router",
      };
    }
    setTests([...testResults]);

    // Test 3: Check router configuration for UniswapV3
    try {
      testResults.push({ name: "UniswapV3 Router Configuration", status: "pending" });
      setTests([...testResults]);

      const uniswapV3Router = await getRouterAddress(DEX_ROUTERS.UNISWAP_V3);
      if (uniswapV3Router && uniswapV3Router !== "0x0000000000000000000000000000000000000000") {
        testResults[2] = {
          name: "UniswapV3 Router Configuration",
          status: "success",
          message: `Router: ${uniswapV3Router}`,
        };
      } else {
        testResults[2] = {
          name: "UniswapV3 Router Configuration",
          status: "error",
          message: "UniswapV3 router not configured",
        };
      }
    } catch (error: any) {
      testResults[2] = {
        name: "UniswapV3 Router Configuration",
        status: "error",
        message: error.message || "Failed to check router",
      };
    }
    setTests([...testResults]);

    // Test 4: Check SushiSwap router
    try {
      testResults.push({ name: "SushiSwap Router Configuration", status: "pending" });
      setTests([...testResults]);

      const sushiRouter = await getRouterAddress(DEX_ROUTERS.SUSHISWAP);
      if (sushiRouter && sushiRouter !== "0x0000000000000000000000000000000000000000") {
        testResults[3] = {
          name: "SushiSwap Router Configuration",
          status: "success",
          message: `Router: ${sushiRouter}`,
        };
      } else {
        testResults[3] = {
          name: "SushiSwap Router Configuration",
          status: "error",
          message: "SushiSwap router not configured",
        };
      }
    } catch (error: any) {
      testResults[3] = {
        name: "SushiSwap Router Configuration",
        status: "error",
        message: error.message || "Failed to check router",
      };
    }
    setTests([...testResults]);

    // Test 5: Check contract owner
    try {
      testResults.push({ name: "Contract Owner Verification", status: "pending" });
      setTests([...testResults]);

      const contract = await getSwapHelperContract();
      const owner = await contract.owner();
      testResults[4] = {
        name: "Contract Owner Verification",
        status: "success",
        message: `Owner: ${owner}`,
      };
    } catch (error: any) {
      testResults[4] = {
        name: "Contract Owner Verification",
        status: "error",
        message: error.message || "Failed to get owner",
      };
    }
    setTests([...testResults]);

    setIsTestingContract(false);

    // Show summary toast
    const successCount = testResults.filter((t) => t.status === "success").length;
    const totalCount = testResults.length;
    
    if (successCount === totalCount) {
      toast.success(`All ${totalCount} tests passed! Contract is fully connected.`);
    } else {
      toast.warning(`${successCount}/${totalCount} tests passed. Check the results below.`);
    }
  };

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "pending":
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
    }
  };

  const getStatusBadge = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Passed</Badge>;
      case "error":
        return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Failed</Badge>;
      case "pending":
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Testing...</Badge>;
    }
  };

  return (
    <Card className="p-6 glass-card border-white/10">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">Smart Contract Connection Test</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Verify SwapHelper contract integration
            </p>
          </div>
          <Button
            onClick={runContractTests}
            disabled={isTestingContract || !account}
            className="gradient-primary"
          >
            {isTestingContract ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              "Run Tests"
            )}
          </Button>
        </div>

        {!account && (
          <div className="flex items-center gap-2 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <Info className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-yellow-500">
              Please connect your wallet to run tests
            </span>
          </div>
        )}

        {account && chainId && (
          <div className="flex items-center gap-4 p-4 rounded-lg glass-card">
            <div>
              <p className="text-xs text-muted-foreground">Connected Account</p>
              <p className="text-sm font-mono">{account.slice(0, 6)}...{account.slice(-4)}</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="text-xs text-muted-foreground">Chain ID</p>
              <p className="text-sm font-semibold">{chainId}</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="text-xs text-muted-foreground">Contract</p>
              <p className="text-sm font-mono">{SWAP_HELPER_ADDRESS.slice(0, 6)}...{SWAP_HELPER_ADDRESS.slice(-4)}</p>
            </div>
          </div>
        )}

        {tests.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">Test Results:</h4>
            {tests.map((test, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg glass-card border border-white/5"
              >
                <div className="mt-0.5">{getStatusIcon(test.status)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-medium">{test.name}</p>
                    {getStatusBadge(test.status)}
                  </div>
                  {test.message && (
                    <p className="text-sm text-muted-foreground break-all">
                      {test.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
