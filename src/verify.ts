import { ethers } from "ethers";
import { CELO_MAINNET_RPC } from "cest-types-sdk";

export async function isContractDeployed(
  contractAddress: string,
  providerUrl: string = CELO_MAINNET_RPC
): Promise<boolean> {
  try {
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const code = await provider.getCode(contractAddress);
    return code !== "0x" && code !== "0x0" && code !== "";
  } catch {
    return false;
  }
}
