import { Icon, IconifyIcon } from '@iconify/react';

export const getIcon = (name: IconifyIcon, color?: string) => (
  <Icon icon={name} width={22} height={22} color={color} />
);
