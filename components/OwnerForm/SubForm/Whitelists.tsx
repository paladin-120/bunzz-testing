import React, {ReactElement, useCallback, useState} from 'react';
import {useRouter} from 'next/router';
import {useSWRConfig} from 'swr';

import {useWeb3} from '@/hooks/useWeb3';
import {useOwners} from '@/hooks/useBunzz';

import {
  Button,
  Input,
  Stack,
  Textarea,
  MediaPicker,
  Box,
  Heading,
  Text,
} from 'degen';

export type WhitelistsParam = {
  users: string[];
  groupId: number;
};

type WhitelistsBoxProps = {
  onUpload: (newParam: WhitelistsParam) => void;
};

const WhitelistsBox = ({onUpload}: WhitelistsBoxProps): ReactElement => {
  const [values, setValues] = useState<WhitelistsParam>({
    users: [],
    groupId: 0,
  });
  const [textValue, setTextValue] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (event, keyValue) => {
    setValues((prevState) => {
      return {
        ...prevState,
        [keyValue]: event.target.value,
      };
    });
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
    const addresses = event.target.value.split('\n');
    setValues((prevState) => {
      return {
        ...prevState,
        users: addresses.filter((address) => {
          return address.length > 0;
        }),
      };
    });
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        setSubmitting(true);
        const data = await onUpload(values);
        console.log('Upload Whitelists', data);
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
          <Heading>Upload Whitelists</Heading>
          <Box width={'full'}>
            <Stack space="4">
              <Textarea
                rows={18}
                label="Whitelists"
                hideLabel={false}
                placeholder="Whitelist addresses (One per line.)"
                value={textValue}
                onChange={handleTextChange}
                required
              />
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
            Upload
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default WhitelistsBox;
