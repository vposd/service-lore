import { Directive, ElementRef, Input, OnInit, NgZone } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';

import { Cell } from './navigation-manager/navigation-manager';

@Directive({ selector: '[appTableCell]' })
export class TableCellDirective implements OnInit, Cell {
  @Input() activeClassName = 'cell--active';
  @Input() appTableCellColIndex: number;
  @Input() appTableCellRowIndex: number;

  get input() {
    if (this._input) {
      return this._input;
    }
    return (this._input = this.elementRef.nativeElement.querySelector('input'));
  }

  get active() {
    return this._active;
  }

  private _input: HTMLInputElement;
  private _active = false;

  constructor(
    private focusMonitor: FocusMonitor,
    private zone: NgZone,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit() {
    const el = this.elementRef.nativeElement;
    if (!this.input) {
      return;
    }
    this.focusMonitor.monitor(this.input).subscribe(focus => {
      this.zone.run(() => {
        if (!focus) {
          this._active = false;
          return el.classList.remove(this.activeClassName);
        }
        this._active = true;
        el.classList.add(this.activeClassName);
        requestAnimationFrame(() => this._input.select());
      });
    });
  }

  focus() {
    this.input.focus();
  }
}
