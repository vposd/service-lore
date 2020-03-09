import { AppShellOptions } from '@common/app-shell/config/app-shell.config.service';
import {
  SidebarConfig,
  MenuItem
} from '@common/app-shell/models/sidebar-config.class';
import { ToolbarConfig } from '@common/app-shell/models/toolbar-config.class';
import { ProductOptions } from '@common/app-shell/models/product-options.class';
import { UserRole } from '@contracts/authentication/user';

export const appShellConfig = new AppShellOptions({
  sidebarConfig: new SidebarConfig({
    menuItems: [
      new MenuItem({
        icon: 'mdi mdi-sale',
        label: 'Промоакции',
        href: 'promotions',
        featureId: 'promo'
      }),
      new MenuItem({
        icon: 'mdi mdi-file-document',
        label: 'Отчеты',
        featureId: 'reports',
        children: [
          new MenuItem({
            label: 'Выполнение промо',
            href: '/reports/loretion-progress',
            featureId: 'promo-progress-report'
          })
        ]
      }),
      new MenuItem({
        icon: 'mdi mdi-settings',
        label: 'Администрирование',
        href: 'settings',
        featureId: 'settings',
        forRoles: [UserRole.Admin]
      })
    ]
  }),
  toolbarConfig: new ToolbarConfig({
    homeLinkEnabled: true
  }),
  productOptions: new ProductOptions({
    iconClass: 'mdi-st-product',
    productName: 'Service Lore'
  })
});
