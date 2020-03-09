import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { StorageService } from '@common/utils/storage/storage.service';
import { FadeInOut } from '@common/animations/fade-in-out.animation';

import { AppShellConfig } from '../../config/app-shell.config.service';
import { SupportDetails } from '../../models/support-details';
import { SupportService } from './app-shell-support.service';

@Component({
  selector: 'app-shell-support',
  templateUrl: './app-shell-support.component.html',
  styleUrls: ['./app-shell-support.component.scss'],
  animations: [FadeInOut]
})
export class AppShellSupportComponent implements OnInit, OnDestroy {
  productName: string;
  supportDetails = new SupportDetails();

  private readonly unsubscribe = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AppShellSupportComponent>,
    private storage: StorageService,
    private appShellConfig: AppShellConfig,
    private support: SupportService
  ) {}

  ngOnInit() {
    this.productName = this.appShellConfig.productOptions.productName;
    // this.support.getDetails()
    //   .pipe(
    //     map(response => ({
    //       ...response,
    //       apiVersion: this.storage.get(this.appShellConfig.settingsCodekeys.apiVersion),
    //       appVersion: this.storage.get(this.appShellConfig.settingsCodekeys.appVersion)
    //     })),
    //     tap(details => this.supportDetails = details),
    //     takeUntil(this.unsubscribe)
    //   )
    //   .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }

  close() {
    this.dialogRef.close();
  }
}
