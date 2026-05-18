import { ethers } from "ethers";
import { CELO_MAINNET_RPC } from "cest-types-sdk";
import type { EvmDeployOptions, EvmTransactionResult } from "cest-types-sdk";

export async function deployContract(options: EvmDeployOptions): Promise<EvmTransactionResult> {
  try {
    const provider = new ethers.JsonRpcProvider(options.providerUrl ?? CELO_MAINNET_RPC);
    const wallet = new ethers.Wallet(options.privateKey, provider);

    const factory = new ethers.ContractFactory(options.abi, options.bytecode, wallet);
    
    const deployTxOptions: any = {};
    if (options.gasLimit) deployTxOptions.gasLimit = options.gasLimit;
    if (options.gasPrice) deployTxOptions.gasPrice = options.gasPrice;

    const contract = await factory.deploy(...(options.args ?? []), deployTxOptions);
    await contract.waitForDeployment();

    const contractAddress = await contract.getAddress();
    const deployTx = contract.deploymentTransaction();

    return {
      txHash: deployTx?.hash ?? "",
      contractAddress,
      success: true,
    };
  } catch (err: any) {
    return {
      txHash: "",
      success: false,
      error: err.message || String(err),
    };
  }
}
