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
      title: 'Master data',
      iconClass: 'mdi mdi-database',
      menu: [
        new MenuItem({
          title: 'Order states',
          href: 'master-data/order-states',
        }),
        new MenuItem({
          title: 'Device failures',
          href: 'master-data/failures',
        }),
        new MenuItem({
          title: 'Products',
          href: 'master-data/products',
        }),
        new MenuItem({
          title: 'Attributes',
          href: 'master-data/attributes',
        }),
      ],
    }),
  ],
};

export const shellConfig = config;
