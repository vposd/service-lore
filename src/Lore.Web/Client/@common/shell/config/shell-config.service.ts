import { Injectable } from '@angular/core';

export class MenuItem {
  title: string;
  iconClass: string;
  href: string;

  constructor(params: Partial<MenuItem>) {
    Object.assign(this, params);
  }
}

@Injectable({ providedIn: 'root' })
export class ShellConfig {
  product = {
    title: '',
    subtitle: '',
  };
  menu: {
    items: MenuItem[];
  } = {
    items: [],
  };
}
