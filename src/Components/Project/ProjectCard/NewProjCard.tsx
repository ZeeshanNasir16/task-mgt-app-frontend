import { Icon } from '@iconify/react';
import { NewProjRoot } from 'Components/Project/ProjectCard/styled';
import React from 'react';
import ProjBoard from '@iconify/icons-eva/layers-outline';
import { Typography } from '@mui/material';

interface Props {
  handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const NewProjCard = ({ handleClick }: Props) => {
  return (
    <NewProjRoot onClick={handleClick}>
      <Icon icon={ProjBoard} width={45} height={45} color='#919EAB' />
      <Typography variant='subtitle1'>New Project</Typography>
    </NewProjRoot>
  );
};

export default NewProjCard;
