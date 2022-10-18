import React, {ReactElement, useCallback, useState} from 'react';
import {useRouter} from 'next/router';
import {useSWRConfig} from 'swr';

import {useWeb3} from '@/hooks/useWeb3';
import {useOwners} from '@/hooks/useBunzz';

import {Stack, Box, Text} from 'degen';
import NewGroupBox, {NewGroupParam} from './SubForm/NewGroup';
import WhitelistsBox, {WhitelistsParam} from './SubForm/Whitelists';
import EnableWhitelistingBox, {
  EnableWhitelistingParam,
} from './SubForm/EnableWhitelists';
import PauseGroupBox, {PauseGroupParam} from './SubForm/PauseGroup';
import RevealNftsBox, {RevealNftsParam} from './SubForm/RevealNfts';

const OwnerForm = (): ReactElement => {
  const router = useRouter();
  const {mutate} = useSWRConfig();
  const {address, contract, provider} = useWeb3();
  const {data: ownerData, loading: setLoading} = useOwners(contract);

  const _beforeTx = (): boolean => {
    if (!contract) {
      alert(`Couldn't get Contract value!`);
      return false;
    }
    if (address != ownerData.owner) {
      alert(`You are not owner!`);
      return false;
    }
    return true;
  };

  const onCreate = async (param: NewGroupParam): Promise<string | null> => {
    console.log('param', param);
    if (!_beforeTx()) {
      return null;
    }

    const tx = await contract?.allocateNewGroup(
      param.baseURI,
      param.notRevealedURI,
      param.amount,
      param.cost,
      param.nftPerAddressLimit,
    );
    const receipt = await tx.wait();
    if (receipt.success) {
      alert(`Successfully created tx:${receipt?.transactionHash}`);
    } else {
      alert(`Tx failed tx:${receipt?.transactionHash}`);
    }
    return receipt?.transactionHash;
  };

  const onUpload = async (param: WhitelistsParam) => {
    console.log('param', param);
    if (!_beforeTx()) {
      return null;
    }
    const tx = await contract?.whitelistUsers(param.users, param.groupId);
    const receipt = await tx.wait();
    if (receipt.success) {
      alert(`Successfully created tx:${receipt?.transactionHash}`);
    } else {
      alert(`Tx failed tx:${receipt?.transactionHash}`);
    }
    return receipt?.transactionHash;
  };

  const onEnable = async (param: EnableWhitelistingParam) => {
    console.log('param', param);
    if (!_beforeTx()) {
      return null;
    }
    const tx = await contract?.setOnlyWhitelisted(
      `${param.state}`,
      param.groupId,
    );
    const receipt = await tx.wait();
    if (receipt.success) {
      alert(
        `Successfully ${param.state ? 'Enabled' : 'Disabled'}. tx:${
          receipt?.transactionHash
        }`,
      );
    } else {
      alert(`Tx failed tx:${receipt?.transactionHash}`);
    }
    return receipt?.transactionHash;
  };

  const onReveal = async (param: RevealNftsParam) => {
    console.log('param', param);
    if (!_beforeTx()) {
      return null;
    }
    const tx = await contract?.reveal(param.groupId);
    const receipt = await tx.wait();
    if (receipt.success) {
      alert(`Successfully Revealed. tx:${receipt?.transactionHash}`);
    } else {
      alert(`Tx failed tx:${receipt?.transactionHash}`);
    }
    return receipt?.transactionHash;
  };

  const onPause = async (param: PauseGroupParam) => {
    console.log('param', param);
    if (!_beforeTx()) {
      return null;
    }
    const tx = await contract?.pause(`${param.state}`, param.groupId);
    const receipt = await tx.wait();
    if (receipt.success) {
      alert(
        `Successfully ${param.state ? 'Enabled' : 'Disabled'}. tx:${
          receipt?.transactionHash
        }`,
      );
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
                  ownerData?.owner || ''
                }`}
                target="_blank"
                rel="noreferrer"
              >
                {ownerData?.owner
                  ? ownerData?.owner?.slice(0, 6) +
                    '...' +
                    ownerData?.owner?.slice(-4)
                  : ''}
              </a>
            </Text>
            <Text>Name: {ownerData?.name}</Text>
            <Text>Symbol: {ownerData?.symbol}</Text>
            <Text>Total Supply: {ownerData?.totalSupply}</Text>
            <Text>Max Supply: {ownerData?.maxSupply}</Text>
          </Stack>
          <Box width={'full'}>
            <Stack
              space="12"
              direction={{xs: 'vertical', sm: 'vertical', md: 'horizontal'}}
            >
              <NewGroupBox onCreate={onCreate} />
              <WhitelistsBox onUpload={onUpload} />
            </Stack>
          </Box>
          <Box width={'full'}>
            <Stack
              space="12"
              direction={{xs: 'vertical', sm: 'vertical', md: 'horizontal'}}
            >
              <EnableWhitelistingBox onEnable={onEnable} />
              <PauseGroupBox onPause={onPause} />
              <RevealNftsBox onReveal={onReveal} />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default OwnerForm;
