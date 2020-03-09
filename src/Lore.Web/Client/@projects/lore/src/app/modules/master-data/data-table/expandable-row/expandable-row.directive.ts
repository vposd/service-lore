import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[appExpandableRow]' })
export class ExpandableRowDirective {
  constructor(readonly templateRef: TemplateRef<any>) {}
}
