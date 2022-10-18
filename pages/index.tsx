import React from 'react';
import Link from 'next/link';
import {Button, IconPlusSmall, Stack, Box} from 'degen';

import routes from '@/routes';
import {withPublicLayout} from '@/layouts';
import {PageContent, PageHeading} from '@/components';

const Home = () => {
  return (
    <>
      <PageHeading title="hitsuji-haneta/GroupedNFT" />
      <PageContent background="backgroundTertiary">
        <Box width={'full'}>
          <Stack space="9" align="flex-start" direction="vertical">
            <Link href={routes.entries.owners} passHref>
              <Button
                center
                variant="highlight"
                width="full"
                prefix={<IconPlusSmall />}
              >
                Go To Owner Page
              </Button>
            </Link>
            <Link href={routes.entries.users} passHref>
              <Button
                center
                variant="highlight"
                width="full"
                prefix={<IconPlusSmall />}
              >
                Go To User Page
              </Button>
            </Link>
          </Stack>
        </Box>
      </PageContent>
    </>
  );
};

export default withPublicLayout(Home);
