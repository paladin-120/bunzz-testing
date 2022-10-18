import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {Avatar, Box, Text} from 'degen';

import routes from '@/routes';
import {withPublicLayout} from '@/layouts';
import {UserForm, PageContent, PageHeading} from '@/components';
import {useWeb3} from '@/hooks/useWeb3';
import {addEllipsis} from '@/utils/string';

const UsersEntry = (): JSX.Element | null => {
  const router = useRouter();
  const {address} = useWeb3();

  useEffect(() => {
    if (!address) {
      alert('Please connect your Metamask wallet');
      router.push(routes.home);
    }
  }, [address]);

  if (!address) {
    return null;
  }

  return (
    <>
      <PageHeading title="Users" />
      <PageContent background="backgroundTertiary">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap="3"
          marginBottom="4"
        >
          <Avatar placeholder label={address} size="10" />
          <Text>{addEllipsis(address)}</Text>
        </Box>
        <UserForm />
      </PageContent>
    </>
  );
};

export default withPublicLayout(UsersEntry);
