import React, {ReactElement} from 'react';
import {useRouter} from 'next/router';

import {useWeb3} from '@/hooks/useWeb3';
import {useUsers} from '@/hooks/useBunzz';

import {Stack, Box, Text} from 'degen';
import MintBox, {MintBoxParam} from './SubForm/Mint';
import NftsBox from './SubForm/Nfts';

const UserForm = (): ReactElement => {
  const router = useRouter();
  const {address, contract, provider} = useWeb3();
  const {
    data: usersData,
    loading: setLoading,
    refetch: onRefetch,
  } = useUsers(contract, address);

  const _beforeTx = (): boolean => {
    if (!contract) {
      alert(`Couldn't get Contract value!`);
      return false;
    }
    return true;
  };

  const onMint = async (param: MintBoxParam): Promise<string | null> => {
    console.log('param', param);
    if (!_beforeTx()) {
      return null;
    }

    let mintCost = 0;
    if (usersData.owner != address) {
      mintCost = param.mintAmount * 100000000000000000; // for testing
    }

    let tx;
    if (mintCost > 0) {
      tx = await contract?.mint(param.mintAmount, {value: `${mintCost}`});
    } else {
      tx = await contract?.mint(param.mintAmount);
    }

    const receipt = await tx.wait();
    if (receipt.success) {
      alert(`Successfully minted tx:${receipt?.transactionHash}`);
      onRefetch();
    } else {
      alert(`Tx failed tx:${receipt?.transactionHash}`);
    }
    return receipt?.transactionHash;
  };

  return (
    <Stack>
      <Stack space="4">
        <Stack direction="vertical" align="center" justify="flex-start">
          <Stack
            direction={{xs: 'vertical', sm: 'horizontal'}}
            space="8"
            align="center"
            justify="flex-start"
            wrap={true}
          >
            <Text>
              Owner:{' '}
              <a
                href={`https://mumbai.polygonscan.com/address/${
                  usersData?.owner || ''
                }`}
                target="_blank"
                rel="noreferrer"
              >
                {usersData?.owner
                  ? usersData?.owner?.slice(0, 6) +
                    '...' +
                    usersData?.owner?.slice(-4)
                  : ''}
              </a>
            </Text>
            <Text>Name: {usersData?.name}</Text>
            <Text>Symbol: {usersData?.symbol}</Text>
            <Text>Total Supply: {usersData?.totalSupply}</Text>
            <Text>Max Supply: {usersData?.maxSupply}</Text>
            <Text>Your Balance: {usersData?.balance}</Text>
          </Stack>
          <Box width={'full'}>
            <Stack
              space="12"
              direction={{xs: 'vertical', sm: 'vertical', md: 'horizontal'}}
            >
              <MintBox onMint={onMint} />
              <NftsBox tokens={usersData?.tokenUris} />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserForm;
