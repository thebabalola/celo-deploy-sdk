import { API_URLS } from "cest-types-sdk";

export interface ContractInfo {
  source: string;
  publishHeight: number;
  clarityVersion: string;
  txId: string;
}

export async function getContractInfo(
  contractAddress: string,
  contractName: string,
  networkUrl: string = API_URLS.mainnet
): Promise<ContractInfo | null> {
  try {
    const resp = await fetch(
      `${networkUrl}/v2/contracts/interface/${contractAddress}/${contractName}`
    );
    if (!resp.ok) return null;

    const sourceResp = await fetch(
      `${networkUrl}/v2/contracts/source/${contractAddress}/${contractName}`
    );
    const sourceData = sourceResp.ok ? await sourceResp.json() : null;

    return {
      source: sourceData?.source ?? "",
      publishHeight: sourceData?.publish_height ?? 0,
      clarityVersion: sourceData?.clarity_version?.toString() ?? "",
      txId: sourceData?.tx_id ?? "",
    };
  } catch {
    return null;
  }
}

export async function isContractDeployed(
  contractAddress: string,
  contractName: string,
  networkUrl: string = API_URLS.mainnet
): Promise<boolean> {
  const info = await getContractInfo(contractAddress, contractName, networkUrl);
  return info !== null;
}
