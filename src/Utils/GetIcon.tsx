import { Icon, IconifyIcon } from '@iconify/react';

export const getIcon = (name: IconifyIcon) => (
  <Icon icon={name} width={22} height={22} />
);
