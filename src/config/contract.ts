export const SWAP_HELPER_ADDRESS = "0x92e9cc05b7935a4bea5669546e3f49df0c9853be";

export const SWAP_HELPER_ABI = [
  "function routers(bytes32) view returns (address)",
  "function executeSwapV2(bytes32 routerId, uint256 amountIn, uint256 amountOutMin, address[] calldata path, uint256 deadline) returns (uint256[] memory amounts)",
  "function executeSwapV3ExactInputSingle(bytes32 routerId, address tokenIn, address tokenOut, uint24 fee, uint256 amountIn, uint256 amountOutMinimum, uint256 deadline, uint160 sqrtPriceLimitX96) returns (uint256 amountOut)",
  "event SwapV2Executed(address indexed user, bytes32 indexed routerId, address[] path, uint amountIn, uint amountOut)",
  "event SwapV3Executed(address indexed user, bytes32 indexed routerId, address tokenIn, address tokenOut, uint24 fee, uint amountIn, uint amountOut)",
];

export const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
];

// Common DEX router IDs (bytes32)
export const DEX_ROUTERS = {
  UNISWAP_V2: "0x556e697377617056320000000000000000000000000000000000000000000000",
  UNISWAP_V3: "0x556e697377617056330000000000000000000000000000000000000000000000",
  SUSHISWAP: "0x537573686973776170000000000000000000000000000000000000000000000",
};
