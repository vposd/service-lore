import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';

import { DialogsService } from './components/dialogs.service';
import { RegularDialogComponent } from './components/regular-dialog-component/regular-dialog.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogHeaderComponent } from './components/dialog/dialog-header/dialog-header.component';
import { DialogBodyComponent } from './components/dialog/dialog-body/dialog-body.component';
import { DialogFooterComponent } from './components/dialog/dialog-footer/dialog-footer.component';
import { DialogActionsDirective } from './components/dialog/dialog-footer/dialog-actions.directive';
import { DialogCloseDirective } from './components/dialog/dialog-close.directive';

@NgModule({
  imports: [CommonModule, MatDialogModule],
  declarations: [
    DialogActionsDirective,
    DialogBodyComponent,
    DialogCloseDirective,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    RegularDialogComponent
  ],
  exports: [
    DialogActionsDirective,
    DialogBodyComponent,
    DialogCloseDirective,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    RegularDialogComponent
  ],
  providers: [
    DialogsService,
    { provide: MATERIAL_SANITY_CHECKS, useValue: false }
  ]
})
export class ModalDialogsModule {}
