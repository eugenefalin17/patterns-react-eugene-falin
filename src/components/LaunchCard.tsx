
import { useReducer } from 'react';
import { Button, Card, Stack } from '@mantine/core';
import { LaunchModal } from './LaunchModal';
import type { Launch } from '../types/launch';

type LaunchCardProps = {
  launch: Launch;
};

type ModalState = {
  isOpen: boolean;
};

type ModalAction = {
  type: 'OPEN' | 'CLOSE';
};

const modalReducer = (
  state: ModalState,
  action: ModalAction
): ModalState => {
  switch (action.type) {
    case 'OPEN':
      return { isOpen: true };
    case 'CLOSE':
      return { isOpen: false };
    default:
      return state;
  }
};

export const LaunchCard = ({ launch }: LaunchCardProps) => {
    const [modalState, dispatchModal] = useReducer(modalReducer, {
  isOpen: false,
});
  return (
    <Card
  shadow="sm"
  padding="md"
  radius="md"
  withBorder
>
 <Stack align="center" gap="xs">
  {launch.links?.mission_patch_small && (
    <img
      src={launch.links.mission_patch_small}
      alt={launch.mission_name}
      width={80}
      height={80}
    />
  )}

  <div>{launch.mission_name}</div>
  <div>{launch.rocket?.rocket_name}</div>
 <Button
  fullWidth
  onClick={() => {
   
    dispatchModal({ type: 'OPEN' });
  }}
>
  See more
</Button>
</Stack>
{modalState.isOpen && (
      <LaunchModal
        launch={launch}
        onClose={() => dispatchModal({ type: 'CLOSE' })}
      />
    )}
</Card>
  );
};