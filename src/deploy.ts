import {
  makeContractDeploy,
  broadcastTransaction,
  PostConditionMode,
} from "@stacks/transactions";
import { API_URLS, MAINNET } from "stacks-types-sdk";
import type { BatchResult } from "stacks-types-sdk";

export interface DeployOptions {
  contractName: string;
  codeBody: string;
  senderKey: string;
  network?: any;
  nonce?: bigint;
  fee?: number;
}

export async function deployContract(options: DeployOptions): Promise<BatchResult> {
  try {
    const tx = await makeContractDeploy({
      contractName: options.contractName,
      codeBody: options.codeBody,
      senderKey: options.senderKey,
      network: options.network ?? MAINNET,
      nonce: options.nonce,
      fee: options.fee,
      postConditionMode: PostConditionMode.Allow,
    });

    const result = await broadcastTransaction({
      transaction: tx,
      network: options.network ?? MAINNET,
    });

    const txid = typeof result === "string" ? result : (result as any)?.txid;
    if (txid && !(result as any).error) {
      return { txid, success: true };
    }
    return { txid: "", success: false, error: JSON.stringify(result) };
  } catch (err: any) {
    return { txid: "", success: false, error: err.message };
  }
}
