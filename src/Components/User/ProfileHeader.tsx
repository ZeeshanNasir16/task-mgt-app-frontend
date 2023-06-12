import { Avatar, Paper, styled } from '@mui/material';
import React from 'react';

interface Props {
  username: string;
}

const InnerDiv = styled('div')(({ theme }) => ({
  '&::before': {
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(6px)',
    backgroundColor: `rgba(0, 82, 73, 0.8)`,
    top: 0,
    zIndex: 0,
    content: '""',
    position: 'absolute',
    borderRadius: 10,
  },
}));

const FrontLayer = styled('div')(({ theme }) => ({
  // min 900px
  right: '0px',
  left: '0px',
  display: 'flex',
  justifyContent: 'center',
  bottom: -25,
  zIndex: 99,
  position: 'absolute',
  marginTop: 40,
}));

const AccountHeader = ({ username }: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        position: 'relative',
        height: 140,
      }}
    >
      <InnerDiv>
        <FrontLayer>
          <Avatar
            src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${username}`}
            alt='user'
            sx={{ width: 110, height: 110 }}
          />
        </FrontLayer>
      </InnerDiv>
    </Paper>
  );
};

export default AccountHeader;
