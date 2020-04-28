import {
  ShellConfig,
  MenuItem,
} from '@common/shell/config/shell-config.service';

const config = new ShellConfig();

config.product = {
  title: 'Lore',
  subtitle: 'My company',
};

config.menu = {
  items: [
    new MenuItem({
      title: 'Orders',
      iconClass: 'mdi mdi-book-open-page-variant',
      href: '/orders',
    }),
    new MenuItem({
      title: 'Settings',
      iconClass: 'mdi mdi-settings',
      href: '/settings',
    }),
  ],
};

export const shellConfig = config;
