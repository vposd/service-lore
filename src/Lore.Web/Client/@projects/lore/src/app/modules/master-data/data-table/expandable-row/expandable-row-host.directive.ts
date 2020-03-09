import { Directive, ViewContainerRef, Input } from '@angular/core';

import { ExpandableRowDirective } from './expandable-row.directive';

@Directive({ selector: '[appExpandableRowHost]' })
export class ExpandableRowHostDirective {
  @Input() appExpandableRowHostContext: ExpandableRowDirective;
  @Input() appExpandableRowHostTemplate: ExpandableRowDirective;

  @Input() set appExpandableRowHostExpanded(expanded: boolean) {
    if (expanded) {
      this.viewContainer.createEmbeddedView(
        this.appExpandableRowHostTemplate.templateRef,
        {
          $implicit: this.appExpandableRowHostContext
        }
      );
      return;
    }
    requestAnimationFrame(() => {
      this.viewContainer.clear();
    });
  }

  constructor(private viewContainer: ViewContainerRef) {}
}
