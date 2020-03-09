import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { RequestProgressComponent } from './request-progress.component';
import { RequestProgressSpinnerComponent } from './request-progress-spinner.component';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [RequestProgressComponent, RequestProgressSpinnerComponent],
  declarations: [RequestProgressComponent, RequestProgressSpinnerComponent]
})
export class RequestProgressModule {}
