import React from 'react';
import {useRouter} from 'next/router';
import {Field, Text} from 'degen';

import {withPublicLayout} from '@/layouts';
import {PageContent, PageHeading} from '@/components';
import {addEllipsis} from '@/utils/string';

const Profile = (): JSX.Element | null => {
  const router = useRouter();
  const {address} = router.query;

  if (!address) {
    return null;
  }

  return (
    <>
      <PageHeading title={`Profile of ${addEllipsis(address as string)}`} />
      <PageContent background="backgroundTertiary">
        <Field label="User's entries:">
          <Text>{address}</Text>
        </Field>
      </PageContent>
    </>
  );
};

export default withPublicLayout(Profile);
