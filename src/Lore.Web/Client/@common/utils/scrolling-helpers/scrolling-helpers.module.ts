import { NgModule } from '@angular/core';

import { TranslateScrollDirective } from './translate-by-scroll.directive';

@NgModule({
  exports: [TranslateScrollDirective],
  declarations: [TranslateScrollDirective]
})
export class ScrollingHelpersModule {}
