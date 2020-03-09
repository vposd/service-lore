import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { AppShellService } from '../../app-shell.service';
import { AppShellConfig } from '../../../config/app-shell.config.service';
import { ProductOptions } from '../../../models/product-options.class';
import { ToolbarConfig } from '../../../models/toolbar-config.class';

@Component({
  selector: 'app-shell-toolbar',
  templateUrl: './app-shell-toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellToolbarComponent implements OnInit {
  productOptions: ProductOptions;
  options: ToolbarConfig;
  homeLinkEnabled: boolean;
  isEnabled$: Observable<boolean>;

  constructor(
    private appShellService: AppShellService,
    private appShellConfig: AppShellConfig
  ) {}

  ngOnInit() {
    this.isEnabled$ = this.appShellService.isEnabled$;

    this.options = this.appShellConfig.toolbarConfig;
    this.productOptions = this.appShellConfig.productOptions;
    this.homeLinkEnabled = this.appShellConfig.toolbarConfig.homeLinkEnabled;
  }

  toggleSidebar() {
    this.appShellService.setNextSidebarState();
  }
}
