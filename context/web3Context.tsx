import React, {createContext, useCallback, useState} from 'react';
import {ethers} from 'ethers';
import {JsonRpcProvider} from '@ethersproject/providers';
import Bunzz, {Handler, Contract} from 'bunzz-sdk';
import {useBunzzHandler} from '@/hooks/useBunzz';

declare let window: {
  ethereum: ethers.providers.ExternalProvider;
};

export type Web3ContextT = {
  provider: JsonRpcProvider | null;
  contract: Contract | undefined;
  address: string | null;
  connect: () => void;
  disconnect: () => void;
};

export const Web3Context = createContext<Web3ContextT>({} as Web3ContextT);

type NFTContractProviderProps = {
  children: React.ReactNode;
};

export const Web3Provider = (props: NFTContractProviderProps) => {
  const {children} = props;
  const provider =
    typeof window == 'undefined' || !window.ethereum
      ? null
      : new ethers.providers.Web3Provider(window.ethereum);
  const {
    bunzzHandler: handler,
    contract,
    loading: bunzzLoading,
  } = useBunzzHandler();

  const [address, setAddress] = useState<string | null>(null);

  const connect = useCallback(async () => {
    if (provider) {
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const currentAddress = await signer.getAddress();
      const chainId = await signer.getChainId();

      if (chainId != (80001 as number)) {
        alert('Please connect to the Polygon Mumbai testnet in MetaMask!');
      }

      setAddress(currentAddress);
    } else {
      alert('Please install MetaMask at https://metamask.io');
    }
  }, [provider]);

  const disconnect = () => {
    setAddress(null);
  };

  return (
    <Web3Context.Provider
      value={{
        provider,
        contract,
        address,
        connect,
        disconnect,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

// test
