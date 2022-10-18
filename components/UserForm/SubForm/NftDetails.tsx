import React, {useEffect, useMemo, useState} from 'react';

import {Avatar, Box, Stack, IconNFT, Text} from 'degen';
import {useGetMetadata} from '@/hooks/useBunzz';

type NftDetailsProps = {
  uri: string;
  tokenId: number;
};

const NftDetails = ({uri, tokenId}: NftDetailsProps): JSX.Element | null => {
  const {data, loading, error, refetch} = useGetMetadata(uri);

  const getImagePath = (ipfsHash: string): string => {
    if (ipfsHash?.startsWith('ipfs://')) {
      return ipfsHash.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
    }
    return ipfsHash;
  };

  return (
    <Stack direction="vertical" align="center" justify="center">
      {loading ? (
        <IconNFT />
      ) : (
        <Box width="48">
          <img
            style={{
              minWidth: '192px',
              minHeight: '192px',
              width: '100%',
              height: '100%',
              borderRadius: '10px',
              border: 'solid 1px #aaaaaa',
            }}
            src={getImagePath(data?.image)}
            alt="loading ... "
          />
        </Box>
      )}
      <Box
        padding="2"
        width="full"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        display="flex"
      >
        <Text>Id: {tokenId}</Text>
      </Box>
    </Stack>
  );
};

export default NftDetails;
