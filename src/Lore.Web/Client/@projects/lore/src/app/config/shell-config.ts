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
      title: 'Main',
      iconClass: 'mdi mdi-book-open-page-variant',
      href: '/',
    }),
    new MenuItem({
      title: 'Settings',
      iconClass: 'mdi mdi-settings',
      href: '/settings',
    }),
  ],
};

export const shellConfig = config;
