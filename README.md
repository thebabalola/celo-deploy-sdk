# celo-deploy-sdk

Lightweight deployment and verification helpers for Celo and EVM-compatible smart contracts using ethers.js.

## Install

```bash
npm install celo-deploy-sdk
```

## Usage

```typescript
import { deployContract, isContractDeployed } from "celo-deploy-sdk";

// ABI and Bytecode from your compiled Solidity contract
const abi = [...];
const bytecode = "0x...";

// Deploy contract to Celo Mainnet (or Alfajores Testnet)
const result = await deployContract({
  abi,
  bytecode,
  privateKey: "your-private-key",
  args: ["Constructor Arg 1", 100n],
  providerUrl: "https://forno.celo.org", // Optional, defaults to Celo Mainnet
});

if (result.success) {
  console.log("Deployed successfully!");
  console.log("Contract Address:", result.contractAddress);
  console.log("Transaction Hash:", result.txHash);
} else {
  console.error("Deployment failed:", result.error);
}

// Check if a contract is deployed at an address
const exists = await isContractDeployed("0x...", "https://forno.celo.org");
```

## API

### `deployContract(options)`
Deploys a Solidity smart contract to Celo. Options:
- `abi` — Compiled Solidity ABI array
- `bytecode` — Contract bytecode string
- `privateKey` — Deployer's EVM private key
- `args?` — Array of constructor arguments
- `providerUrl?` — RPC endpoint (default: Celo Mainnet forno RPC)
- `gasLimit?` — Custom gas limit bigint
- `gasPrice?` — Custom gas price bigint

### `isContractDeployed(contractAddress, providerUrl?)`
Checks if a smart contract exists at the given on-chain address (verifies code presence).

## License

MIT

## Author

thebabalola
