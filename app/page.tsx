'use client';
import { useEffect, useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useConnect, useDisconnect } from 'wagmi';
import { helloMantaAbi } from '../lib/abi';

const CONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

// shorten address for display
const shortAddrHash = (addr?: string, start = 6, end = 4) =>
    addr ? `${addr.slice(0, start)}...${addr.slice(-end)}` : '';

export default function Home() {
  const { address, isConnected } = useAccount();  // get user wallet address and connection status
  const { connect, connectors, isPending: isConnecting } = useConnect();  // connect wallet function and status
  const { disconnect } = useDisconnect(); 

  const { data: currentMessage, refetch, isFetching } = useReadContract({
    address: CONTRACT as `0x${string}`,
    abi: helloMantaAbi,
    functionName: 'message',
  });

  const [newMsg, setNewMsg] = useState('');
  const { data: hash, isPending: isSending, writeContract, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isConfirmed) refetch();
  }, [isConfirmed, refetch]);

  return (
    // centered layout. top block is title and link to blockscout
    <main suppressHydrationWarning style={{ maxWidth: 520, margin: '80px auto', fontFamily: 'sans-serif' }}>
      <h1>Hello Manta App</h1>
      <p style={{ fontSize: 14, margin: '8px 0' }}>
        Verified contract:{" "}
        <a href="https://pacific-explorer.sepolia-testnet.manta.network/address/0x25de0C203C6215D6D27fc06E004e9485f981d87F?tab=contract_source_code" target="_blank" rel="noreferrer">
          View on Blockscout
        </a>
      </p>
      <p style={{ fontSize: 12, color: 'gray', marginTop: 8 }}>
        Note: This dApp currently works only on desktop browsers with the MetaMask extension enabled.
      </p>
        {/* connect wallet section connected via injected connector (MetaMask) from wagmi in providers.tsx */}
      <section style={{ margin: '16px 0' }}>
        {isConnected ? (
          <div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Connected: {shortAddrHash(address)}</div>
            <button onClick={() => disconnect()} style={{ marginTop: 8 }}>Disconnect</button>
          </div>
        ) : (
          <button onClick={() => connect({ connector: connectors[0]! })} disabled={isConnecting}        >
            {isConnecting ? 'Connecting…' : 'Connect Wallet (MetaMask)'}
          </button>
        )}
      </section>

      <section style={{ margin: '24px 0', padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
        <h3>Current message</h3>
        <div style={{ minHeight: 24 }}>
          {isFetching ? 'Loading…' : <code>{(currentMessage as string) ?? '(empty)'}</code>}
        </div>
        <button onClick={() => refetch()} style={{ marginTop: 8 }}>Refresh</button>
      </section>

      <section style={{ margin: '24px 0', padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
        <h3>Update message</h3>
        <input suppressHydrationWarning 
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Hello Manta Test!"
          style={{ width: '100%', padding: 8 }}
        />
        <button
          onClick={() =>
            writeContract({ address: CONTRACT as `0x${string}`, abi: helloMantaAbi, functionName: 'setMessage', args: [newMsg] })
          }
          disabled={!isConnected || !newMsg || isSending || isConfirming}
          style={{ marginTop: 8 }}
        >
          {isSending ? 'Sending…' : isConfirming ? 'Confirming…' : 'Set Message'}
        </button>

        {hash && (
          <div style={{ marginTop: 8, fontSize: 12 }}>
            Tx: <a href={`https://pacific-explorer.sepolia-testnet.manta.network/tx/${hash}`} target="_blank" rel="noreferrer">{shortAddrHash(hash)}</a>
          </div>
        )}
        {writeError && <div style={{ color: 'crimson', marginTop: 8 }}>{writeError.message}</div>}

        <p style={{ fontSize: 12, color: 'gray', marginTop: 8 }}>
            Reminder: when sending transactions, ensure your wallet nonce is set to the correct value (greater than 0).
        </p>
      </section>
    </main>
  );
}