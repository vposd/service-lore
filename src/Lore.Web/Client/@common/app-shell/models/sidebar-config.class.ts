import { UserRole } from '@contracts/authentication/user';

export class MenuItem {
  children?: MenuItem[];
  featureId?: string;
  forRoles?: UserRole[];
  hiddenByDefault?: boolean;
  href?: string;
  icon?: string;
  isActive?: boolean;
  isBookmarked?: boolean;
  isCollapsed?: boolean;
  label?: string;
  parentName?: string;
  pluggable?: boolean;
  onClick?: (...args: any[]) => void;

  constructor(params?: Partial<MenuItem>) {
    this.isCollapsed = true;
    Object.assign(this, params || {});
  }
}

export class SidebarConfig {
  menuItems?: MenuItem[];
  userMenuItems?: MenuItem[];
  bookmarkEnabled?: boolean;
  searchEnabled?: boolean;

  constructor(input?: SidebarConfig) {
    Object.assign(this, input);
  }
}
