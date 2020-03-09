import { Directive, OnInit, ContentChildren, QueryList, ViewChildren, ElementRef } from '@angular/core';

@Directive({ selector: '[appTableRow]' })
export class TableRowDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }
}
