import useSWR from 'swr';
import {AxiosError} from 'axios';
import {PublicConfiguration} from 'swr/dist/types';

import {basicFetcher} from '@/fetchers';
import bunzz, {Contract, Handler} from 'bunzz-sdk';
import {useEffect, useState} from 'react';
import {initialize} from '@/lib/bunzz-sdk';

const defaultSwrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
} as PublicConfiguration;

export const useBunzzHandler = (): {
  bunzzHandler: Handler | undefined;
  contract: Contract | undefined;
  loading: boolean;
} => {
  const [handler, setBunzzHanlder] = useState<Handler>();
  const [gnftContract, setGnftContract] = useState<Contract>();

  const [loading, setLoading] = useState(true);

  const setHandler = async () => {
    const _handler = await initialize();
    if (_handler) {
      setBunzzHanlder(_handler);
      setGnftContract(_handler.getContract('GroupedNFT'));
    }
  };

  useEffect(() => {
    setHandler();
  }, []);

  return {
    bunzzHandler: handler,
    contract: gnftContract,
    loading: loading,
  };
};

export const useOwners = (
  contract: Contract | undefined,
): {
  data: any | undefined;
  loading: boolean;
} => {
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');

  const fetchInfo = async () => {
    if (contract) {
      const _ownerRes = await contract.owner();
      setOwner(_ownerRes.data);
      const _supplyRes = await contract.totalSupply();
      setTotalSupply(_supplyRes.data);
      const _maxRes = await contract._maxSupply();
      setMaxSupply(_maxRes.data);
      const _symbolRes = await contract.symbol();
      setSymbol(_symbolRes.data);
      const _nameRes = await contract['name']();
      setName(_nameRes.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [contract]);

  return {
    data: {
      owner: owner,
      totalSupply: totalSupply,
      maxSupply: maxSupply,
      symbol: symbol,
      name: name,
    },
    loading: loading,
  };
};

export const useUsers = (
  contract: Contract | undefined,
  address: string | null,
): {
  data: any | undefined;
  loading: boolean;
  refetch: () => void;
} => {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [tokenIds, setTokenIds] = useState([]);
  const [tokenUris, setTokenUris] = useState<any>([]);
  const [owner, setOwner] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');

  const fetchInfo = async () => {
    if (contract) {
      const _ownerRes = await contract.owner();
      setOwner(_ownerRes.data);
      const _supplyRes = await contract.totalSupply();
      setTotalSupply(_supplyRes.data);
      const _maxRes = await contract._maxSupply();
      setMaxSupply(_maxRes.data);
      const _symbolRes = await contract.symbol();
      setSymbol(_symbolRes.data);
      const _nameRes = await contract['name']();
      setName(_nameRes.data);
      if (address) {
        const _balanceRes = await contract.balanceOf(address);
        setBalance(_balanceRes.data);
        const _tokenIdRes = await contract.walletOfOwner(address);
        setTokenIds(_tokenIdRes.data);
        const _tokenUris: Array<any> = [];
        for (let i = 0; i < _tokenIdRes.data.length; i++) {
          const _tokenUriRes = await contract.tokenURI(_tokenIdRes.data[i]);
          _tokenUris.push({uri: _tokenUriRes.data, id: _tokenIdRes.data[i]});
        }
        setTokenUris(_tokenUris);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [contract]);

  return {
    data: {
      owner: owner,
      totalSupply: totalSupply,
      maxSupply: maxSupply,
      symbol: symbol,
      name: name,
      balance: balance,
      tokenIds: tokenIds,
      tokenUris: tokenUris,
    },
    loading: loading,
    refetch: fetchInfo,
  };
};

export const useGetMetadata = (
  uri = '',
  swrOptions = defaultSwrOptions,
): {
  data: any | undefined;
  loading: boolean;
  error: AxiosError | undefined;
  refetch: () => void;
} => {
  const {data, error, mutate, isValidating} = useSWR<any, AxiosError>(
    uri.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/'),
    basicFetcher,
    swrOptions,
  );

  return {
    data,
    loading: (!error && !data) || isValidating,
    error: error,
    refetch: mutate,
  };
};
