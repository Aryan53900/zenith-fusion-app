import { BrowserProvider, Contract, formatUnits, parseUnits } from "ethers";
import { SWAP_HELPER_ADDRESS, SWAP_HELPER_ABI, ERC20_ABI } from "@/config/contract";
import { Token } from "@/config/tokens";

export async function getProvider() {
  if (!window.ethereum) {
    throw new Error("No wallet detected");
  }
  return new BrowserProvider(window.ethereum);
}

export async function getSigner() {
  const provider = await getProvider();
  return await provider.getSigner();
}

export async function getSwapHelperContract() {
  const signer = await getSigner();
  return new Contract(SWAP_HELPER_ADDRESS, SWAP_HELPER_ABI, signer);
}

export async function getTokenContract(tokenAddress: string) {
  const signer = await getSigner();
  return new Contract(tokenAddress, ERC20_ABI, signer);
}

export async function getTokenBalance(tokenAddress: string, userAddress: string): Promise<string> {
  try {
    if (tokenAddress === "0x0000000000000000000000000000000000000000") {
      const provider = await getProvider();
      const balance = await provider.getBalance(userAddress);
      return formatUnits(balance, 18);
    }
    
    const tokenContract = await getTokenContract(tokenAddress);
    const balance = await tokenContract.balanceOf(userAddress);
    const decimals = await tokenContract.decimals();
    return formatUnits(balance, decimals);
  } catch (error) {
    console.error("Error getting token balance:", error);
    return "0";
  }
}

export async function approveToken(tokenAddress: string, amount: string, decimals: number): Promise<boolean> {
  try {
    const tokenContract = await getTokenContract(tokenAddress);
    const amountWei = parseUnits(amount, decimals);
    const tx = await tokenContract.approve(SWAP_HELPER_ADDRESS, amountWei);
    await tx.wait();
    return true;
  } catch (error) {
    console.error("Error approving token:", error);
    return false;
  }
}

export async function checkAllowance(tokenAddress: string, userAddress: string, decimals: number): Promise<string> {
  try {
    const tokenContract = await getTokenContract(tokenAddress);
    const allowance = await tokenContract.allowance(userAddress, SWAP_HELPER_ADDRESS);
    return formatUnits(allowance, decimals);
  } catch (error) {
    console.error("Error checking allowance:", error);
    return "0";
  }
}

export async function executeSwapV2(
  routerId: string,
  amountIn: string,
  amountOutMin: string,
  path: string[],
  deadline: number,
  decimalsIn: number,
  decimalsOut: number
) {
  try {
    const contract = await getSwapHelperContract();
    const amountInWei = parseUnits(amountIn, decimalsIn);
    const amountOutMinWei = parseUnits(amountOutMin, decimalsOut);
    
    const tx = await contract.executeSwapV2(
      routerId,
      amountInWei,
      amountOutMinWei,
      path,
      deadline
    );
    
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error("Error executing swap:", error);
    throw error;
  }
}

export async function executeSwapV3ExactInputSingle(
  routerId: string,
  tokenIn: string,
  tokenOut: string,
  fee: number,
  amountIn: string,
  amountOutMinimum: string,
  deadline: number,
  decimalsIn: number,
  decimalsOut: number,
  sqrtPriceLimitX96: bigint = 0n
) {
  try {
    const contract = await getSwapHelperContract();
    const amountInWei = parseUnits(amountIn, decimalsIn);
    const amountOutMinWei = parseUnits(amountOutMinimum, decimalsOut);
    
    const tx = await contract.executeSwapV3ExactInputSingle(
      routerId,
      tokenIn,
      tokenOut,
      fee,
      amountInWei,
      amountOutMinWei,
      deadline,
      sqrtPriceLimitX96
    );
    
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error("Error executing V3 swap:", error);
    throw error;
  }
}

export async function getRouterAddress(routerId: string): Promise<string> {
  try {
    const contract = await getSwapHelperContract();
    const routerAddress = await contract.routers(routerId);
    return routerAddress;
  } catch (error) {
    console.error("Error getting router address:", error);
    return "0x0000000000000000000000000000000000000000";
  }
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
