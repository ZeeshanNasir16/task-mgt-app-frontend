import { Paper, Typography } from '@mui/material';
import Page from 'Components/common/Page';
import AccountHeader from 'Components/User/AccountHeader';
import { RndCrndWrapper } from 'Layouts/common/RoundCornWrapper';
import { WrapperHeader } from 'Layouts/common/WrapperHeader';
import React from 'react';

type Props = {};

export const MyAccount = (props: Props) => {
  return (
    <Page title='My Account | Manager'>
      <WrapperHeader heading='My Account' />
      <AccountHeader />
    </Page>
  );
};
