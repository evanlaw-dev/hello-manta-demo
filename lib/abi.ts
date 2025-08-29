export const helloMantaAbi = [
    { type: 'function', name: 'message', stateMutability: 'view', inputs: [], outputs: [{ type: 'string' }] },
    { type: 'function', name: 'setMessage', stateMutability: 'nonpayable', inputs: [{ name: '_message', type: 'string' }], outputs: [] },
  ] as const;