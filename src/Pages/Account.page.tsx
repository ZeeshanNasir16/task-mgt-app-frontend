import React from 'react';

import { useAppSelector } from 'store/hooks.store';
import { WrapperHeader } from 'Layouts/common/WrapperHeader';

import Page from 'Components/common/Page';
// import AccountHeader from 'Components/User/ProfileHeader';

export const MyAccount = () => {
  const { user } = useAppSelector((st) => st.auth);

  return (
    <Page title={`My Account | ${user?.role}`}>
      <WrapperHeader heading='My Account' />
      {/* <AccountHeader username={`${user?.fullName}`} /> */}
    </Page>
  );
};
