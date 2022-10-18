import routes from '@/routes';
import {Button, Text, Stack} from 'degen';
import Link from 'next/link';
import React from 'react';

const Logo = (): JSX.Element => {
  return (
    <Stack direction="horizontal" align="center">
      <Link href={routes.home} passHref>
        <Button shape="circle" variant="secondary">
          T
        </Button>
      </Link>
      <Text variant="extraLarge">Bunzz Community</Text>
    </Stack>
  );
};

export default Logo;
