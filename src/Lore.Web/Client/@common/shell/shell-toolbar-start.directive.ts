import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[shellToolbarStart]' })
export class ShellToolbarStartDirective {
  constructor(readonly template: TemplateRef<any>) {}
}
