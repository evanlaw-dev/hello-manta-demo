'use client';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mantaSepolia = {
  id: 3441006,
  name: 'Manta Pacific Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: [process.env.NEXT_PUBLIC_RPC_URL!] } },
  blockExplorers: { default: { name: 'Blockscout', url: 'https://pacific-explorer.sepolia-testnet.manta.network' } },
};

// configure wagmi client to use manta sepolia chain and injected connector (MetaMask)
const config = createConfig({
  chains: [mantaSepolia],
  transports: { [mantaSepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL!) },
  connectors: [injected()], // use injected connector (MetaMask)
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}