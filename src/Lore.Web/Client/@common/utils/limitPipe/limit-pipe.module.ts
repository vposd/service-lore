import { NgModule } from '@angular/core';

import { LimitPipe } from './limit.pipe';

@NgModule({
  exports: [LimitPipe],
  declarations: [LimitPipe]
})
export class LimitPipeModule {}
