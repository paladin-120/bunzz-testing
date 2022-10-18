import React, {ReactElement, useCallback, useState} from 'react';

import {Button, Input, Stack, Box, Heading} from 'degen';

export type RevealNftsParam = {
  groupId: number;
};

type RevealNftsBoxProps = {
  onReveal: (newParam: RevealNftsParam) => void;
};

const RevealNftsBox = ({onReveal}: RevealNftsBoxProps): ReactElement => {
  const [values, setValues] = useState<RevealNftsParam>({
    groupId: 0,
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

  const onClick = async () => {
    try {
      setSubmitting(true);
      const data = await onReveal(values);
      console.log('On Reveal', data);
    } catch (error: any) {
      console.log('Error: ', error);
      const errorMessage = error?.message || 'Something went wrong.';
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box width={'full'}>
      <Stack space="4" align="center" justify="center">
        <Heading>Reveal Group NFTs</Heading>
        <Box width={'full'}>
          <Input
            label="Group ID"
            hideLabel={false}
            placeholder="ID = 1, 2, 3, 4, 5, ..."
            value={values.groupId}
            onChange={(event) => {
              handleChange(event, 'groupId');
            }}
            autoFocus
            required
          />
        </Box>
        <Stack space="2" align="center" justify="center" direction="horizontal">
          <Button
            variant="highlight"
            width={{xs: 'full', md: 'max'}}
            type="submit"
            data-testid="submit-btn"
            loading={submitting}
            disabled={submitting}
            onClick={onClick}
          >
            Reveal
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default RevealNftsBox;
