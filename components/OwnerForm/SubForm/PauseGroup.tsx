import React, {ReactElement, useState} from 'react';
import {Button, Input, Stack, Box, Heading, Text} from 'degen';

export type PauseGroupParam = {
  state: boolean;
  groupId: number;
};

type PauseGroupBoxProps = {
  onPause: (newParam: PauseGroupParam) => void;
};

const PauseGroupBox = ({onPause}: PauseGroupBoxProps): ReactElement => {
  const [values, setValues] = useState<PauseGroupParam>({
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

  const onEnable = async () => {
    try {
      setSubmitting(true);
      const data = await onPause({state: true, groupId: values.groupId});
      console.log('On Pause', data);
    } catch (error: any) {
      console.log('Error: ', error);
      const errorMessage = error?.message || 'Something went wrong.';
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const onDisable = async () => {
    try {
      setSubmitting(true);
      const data = await onPause({state: false, groupId: values.groupId});
      console.log('On Pause', data);
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
        <Heading>Pause / Unpause Sale</Heading>
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
            onClick={onEnable}
          >
            Pause
          </Button>
          <Button
            variant="highlight"
            width={{xs: 'full', md: 'max'}}
            type="submit"
            data-testid="submit-btn"
            loading={submitting}
            disabled={submitting}
            onClick={onDisable}
          >
            Unpause
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PauseGroupBox;
