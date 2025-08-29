import type { HardhatUserConfig } from "hardhat/config";
import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import hardhatIgnitionViem from "@nomicfoundation/hardhat-ignition-viem";
import { configVariable } from "hardhat/config";
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxViemPlugin, hardhatIgnitionViem],
  solidity: {
    profiles: {
      default: { version: "0.8.28" },
      production: {
        version: "0.8.28",
        settings: { optimizer: { enabled: true, runs: 200 } },
      },
    },
  },
  networks: {
    hardhatMainnet: { type: "edr-simulated", chainType: "l1" },
    hardhatOp: { type: "edr-simulated", chainType: "op" },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
    mantaSepolia: {
      type: "http",
      chainType: "op", // layer 2 optimism
      url: configVariable("MANTA_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
      ignition: {
        maxPriorityFeePerGas: 1_500_000_000n, // 1.5 gwei
        maxFeePerGasLimit: 30_000_000_000n, // 30 gwei
        disableFeeBumping: false, // so that ignition can adjust gas fees
      },
    },
  },
};

export default config;