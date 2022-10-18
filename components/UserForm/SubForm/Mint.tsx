import React, {ReactElement, useCallback, useState} from 'react';

import {Button, Input, Stack, Box, Heading} from 'degen';

export type MintBoxParam = {
  mintAmount: number;
};

type MintBoxProps = {
  onMint: (newParam: MintBoxParam) => Promise<string | null>;
};

const MintBox = ({onMint}: MintBoxProps): ReactElement => {
  const [values, setValues] = useState<MintBoxParam>({
    mintAmount: 1,
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
        const data = await onMint(values);
        console.log('On Mint', data);
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
          <Heading>Mint NFTs</Heading>
          <Box width={'full'}>
            <Stack space="4">
              <Input
                label="Minting Count"
                hideLabel={false}
                placeholder="1, 2, 3..."
                value={values.mintAmount}
                onChange={(event) => {
                  handleChange(event, 'mintAmount');
                }}
                type="number"
                autoFocus
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
            Mint
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default MintBox;
