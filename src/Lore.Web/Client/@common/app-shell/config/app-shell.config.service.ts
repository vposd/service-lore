import { InjectionToken, Injectable, Inject, Optional } from '@angular/core';

import { StorageService } from '@common/utils/storage/storage.service';
// import { Updatable } from '@common/utils/updatable/updatable.class';

import { ProductOptions } from '../models/product-options.class';
import { ToolbarConfig } from '../models/toolbar-config.class';
import { SidebarConfig } from '../models/sidebar-config.class';

interface AppShellEndpoints {
  supportInfo?: string;
}

export const APP_SHELL_CONFIG = new InjectionToken('APP_SHELL_CONFIG');

export class AppShellOptions {
  /** List of feature modules metadata */
  featureModules;

  /** Disable user settings sync */
  userSettingsDisabled: boolean;
  productOptions = new ProductOptions();
  toolbarConfig = new ToolbarConfig();
  sidebarConfig = new SidebarConfig();
  endpoints: AppShellEndpoints = {};
  routeLoadingProgress = true;

  get settingsCodekeys() {
    return {
      brandingColor: `branding__color`,
      brandingLogo: `branding__company-logo`,
      bookmarkItems: 'bookmark-items'
    };
  }

  constructor(params?: Partial<AppShellConfig>) {
    Object.assign(this, params || {});
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppShellConfig extends AppShellOptions {
  constructor(
    @Optional() @Inject(APP_SHELL_CONFIG) config: AppShellOptions,
    private storage: StorageService
  ) {
    super(config);
  }
}
