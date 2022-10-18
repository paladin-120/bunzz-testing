import React, {ReactElement, useCallback, useState} from 'react';

import {Stack, Box, Heading} from 'degen';

import NftDetails from './NftDetails';

type NftDetailsProps = {
  uri: string;
  id: number;
};

type NftsBoxProps = {
  tokens: NftDetailsProps[];
};

const NftsBox = ({tokens}: NftsBoxProps): ReactElement => {
  return (
    <Box width={'full'}>
      <Stack space="4" align="center" justify="center">
        <Heading>Your NFTs</Heading>
        <Box width={'full'}>
          <div
            style={{
              display: 'grid',
              gap: '4rem',
              gridTemplateColumns: 'auto auto',
              width: '100%',
            }}
          >
            {tokens.map((token) => (
              <NftDetails uri={token.uri} tokenId={token.id} />
            ))}
          </div>
        </Box>
      </Stack>
    </Box>
  );
};

export default NftsBox;
