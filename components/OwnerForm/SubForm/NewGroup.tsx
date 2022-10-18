import React, {ReactElement, useCallback, useState} from 'react';

import {Button, Input, Stack, Box, Heading} from 'degen';

export type NewGroupParam = {
  baseURI: string;
  notRevealedURI: string;
  amount: number;
  cost: number;
  nftPerAddressLimit: number;
};

type NewGroupBoxProps = {
  onCreate: (newParam: NewGroupParam) => Promise<string | null>;
};

const NewGroupBox = ({onCreate}: NewGroupBoxProps): ReactElement => {
  const [values, setValues] = useState<NewGroupParam>({
    baseURI: '',
    notRevealedURI: '',
    amount: 10,
    cost: 0,
    nftPerAddressLimit: 20,
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (event, keyValue) => {
    setValues((prevState) => {
      return {
        ...prevState,
        [keyValue]: event.target.value,
      };
    });
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        setSubmitting(true);
        const data = await onCreate(values);
        console.log('Create Group', data);
      } catch (error: any) {
        console.log('Error: ', error);
        const errorMessage = error?.message || 'Something went wrong.';
        alert(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
    [values],
  );

  return (
    <Box width={'full'}>
      <form onSubmit={handleSubmit}>
        <Stack space="4" align="center" justify="center">
          <Heading>Create New Group</Heading>
          <Box width={'full'}>
            <Stack space="4">
              <Input
                label="Base URI"
                hideLabel={false}
                placeholder="ipfs://..."
                value={values.baseURI}
                onChange={(event) => {
                  handleChange(event, 'baseURI');
                }}
                autoFocus
                required
              />
              <Input
                label="Not Revealed URI"
                hideLabel={false}
                placeholder="ipfs://..."
                value={values.notRevealedURI}
                onChange={(event) => {
                  handleChange(event, 'notRevealedURI');
                }}
                autoFocus
                required
              />
              <Input
                label="Allocated NFTs"
                hideLabel={false}
                placeholder="10"
                value={values.amount}
                onChange={(event) => {
                  handleChange(event, 'amount');
                }}
                type="number"
                required
              />
              <Input
                label="NFT price (WEI)"
                hideLabel={false}
                placeholder="NFT Price in Wei"
                value={values.cost}
                onChange={(event) => {
                  handleChange(event, 'cost');
                }}
                type="number"
                required
              />
              <Input
                label="NFT Per Address Limit"
                hideLabel={false}
                placeholder="NFT Price in Wei"
                value={values.nftPerAddressLimit}
                onChange={(event) => {
                  handleChange(event, 'nftPerAddressLimit');
                }}
                type="number"
                required
              />
            </Stack>
          </Box>
          <Button
            variant="highlight"
            width={{xs: 'full', md: 'max'}}
            type="submit"
            data-testid="submit-btn"
            loading={submitting}
            disabled={submitting}
          >
            Create
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default NewGroupBox;
