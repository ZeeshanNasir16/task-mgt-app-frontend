import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import Scrollbar from 'Components/common/Scrollbar';
import { useAppSelector } from 'store/hooks';
import { User } from 'interfaces/User';
import { Button, Input, styled } from '@mui/material';

const PartBoxRoot = styled(Box)(({ theme }) => ({
  gap: '1rem',
  flexWrap: 'nowrap',
  padding: '0.5rem 0.75rem',
}));

interface IProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  handleSelected: (arr: any) => unknown;
  selectionType: 'single' | 'multiple';
  users: User[];
}

export default function SelectParticipants(props: IProps) {
  const { anchorEl, handleClose, handleSelected, selectionType, users } = props;

  const [part, setPart] = React.useState<any>({
    partUsers: Array.from(users.map((el: User) => ({ ...el, checked: false }))),
  });

  const handleAddPart = (event: any) => {
    const { checked, name } = event.target;

    if (selectionType === 'multiple')
      setPart((st: any) => ({
        partUsers: st.partUsers.map((object: any) =>
          object.id === name ? { ...object, checked } : object
        ),
      }));
    else
      setPart((st: any) => ({
        partUsers: st.partUsers.map((object: any) =>
          object.id === name
            ? { ...object, checked }
            : object.checked
            ? { ...object, checked: !object.checked }
            : object
        ),
      }));
  };

  const addToForm = () => {
    let participants = part.partUsers.filter((el: any) => el.checked);

    if (participants.length > 0) handleSelected(participants);
    else handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 14,
              right: 0,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <Scrollbar sx={{ height: 250, width: 250 }}>
          <>
            {users &&
              users.map((el: User, ind: number) => (
                <PartBoxRoot key={el._id} className='dispFlexAlgnCentr'>
                  <input
                    type='checkbox'
                    id='checkbox'
                    value={el.fullName}
                    name={el._id}
                    onChange={handleAddPart}
                    checked={part.partUsers[ind].checked}
                  />
                  <Avatar
                    alt={`${el.fullName}`}
                    src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${el.fullName
                      .split(' ')
                      .join('%20')}`}
                  />
                  <Typography variant='body1' component='span'>
                    {el.fullName}
                  </Typography>
                </PartBoxRoot>
              ))}
          </>
        </Scrollbar>
        <Box width='100%' sx={{ paddingInline: '0.75rem' }}>
          <Button
            variant='contained'
            color='primary'
            size='small'
            fullWidth
            onClick={addToForm}
          >
            Add Selected
          </Button>
        </Box>
      </Menu>
    </React.Fragment>
  );
}
