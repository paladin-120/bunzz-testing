import React, {ReactElement, useState} from 'react';

import {Button, Input, Stack, Box, Heading} from 'degen';

export type EnableWhitelistingParam = {
  state: boolean;
  groupId: number;
};

type EnableWhitelistsBoxProps = {
  onEnable: (newParam: EnableWhitelistingParam) => void;
};

const EnableWhitelistsBox = ({
  onEnable,
}: EnableWhitelistsBoxProps): ReactElement => {
  const [values, setValues] = useState<EnableWhitelistingParam>({
    groupId: 0,
    state: true,
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

  const onEnableClicked = async () => {
    try {
      setSubmitting(true);
      const data = await onEnable({state: true, groupId: values.groupId});
      console.log('Enable Whitelisting', data);
    } catch (error: any) {
      console.log('Error: ', error);
      const errorMessage = error?.message || 'Something went wrong.';
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const onDisableClicked = async () => {
    try {
      setSubmitting(true);
      const data = await onEnable({state: false, groupId: values.groupId});
      console.log('Disable Whitelisting', data);
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
        <Heading>Enable / Disable Whitelisting</Heading>
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
            onClick={onEnableClicked}
          >
            Enable
          </Button>
          <Button
            variant="highlight"
            width={{xs: 'full', md: 'max'}}
            type="submit"
            data-testid="submit-btn"
            loading={submitting}
            disabled={submitting}
            onClick={onDisableClicked}
          >
            Disable
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EnableWhitelistsBox;
