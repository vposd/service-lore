import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  Optional,
  Self,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
  ViewChildren,
  QueryList
} from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgControl, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';
import { size } from 'lodash/fp';

export type SelectValue<T> = T | T[];

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: SelectComponent
    }
  ]
})
export class SelectComponent<T>
  implements
    OnInit,
    OnDestroy,
    ControlValueAccessor,
    MatFormFieldControl<SelectValue<T>> {
  get shouldLabelFloat() {
    return this.select.shouldLabelFloat;
  }

  get empty() {
    return this.select.empty;
  }

  @Input()
  get placeholder() {
    return this.select.placeholder;
  }
  set placeholder(value: string) {
    this.select.placeholder = value;
  }

  @Input()
  get required() {
    return this.select.required;
  }
  set required(value: boolean) {
    if (this.select) {
      this.select.required = value;
    }
  }

  @Input()
  get disabled(): boolean {
    return this.select.disabled;
  }
  set disabled(value: boolean) {
    this.select.disabled = value;
  }

  @Input()
  get value() {
    return this.select.value;
  }
  set value(value) {
    this.select.value = value;
  }

  @Input() multiple: boolean;
  @Input() values: T[];

  @ViewChild(MatSelect, { static: true }) select: MatSelect;
  @ViewChild(CdkVirtualScrollViewport)
  cdkVirtualScrollViewPort: CdkVirtualScrollViewport;

  @ViewChildren(MatOption)
  matOptions: QueryList<MatOption>;

  autofilled?: boolean;
  controlType?: string;
  describedBy = '';
  errorState = false;
  focused = false;
  id: string;
  query = '';
  searchEnabled = false;
  stateChanges = new Subject<void>();
  virtualScrollEnabled = false;

  constructor(
    private readonly _focusMonitor: FocusMonitor,
    private readonly _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() readonly ngControl: NgControl
  ) {
    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.disabled) {
        return;
      }
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  @Input()
  compareWith(a: T, b: T) {
    return a === b;
  }

  ngOnInit() {
    this.select.stateChanges.subscribe(() => this.stateChanges.next());
    this.select.valueChange.subscribe(value => {
      this.onChange(value);
      this.writeValue(value);
    });
    this.id = this.select.id;
    this.searchEnabled = !!size(this.values);
    this.virtualScrollEnabled = size(this.values) > 50;
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  openChange(event: boolean) {
    if (event && this.cdkVirtualScrollViewPort) {
      this.cdkVirtualScrollViewPort.scrollToIndex(0);
      this.cdkVirtualScrollViewPort.checkViewportSize();
    }
  }

  setDescribedByIds(ids: string[]) {
    this.select.setDescribedByIds(ids);
  }

  onContainerClick() {
    this.select.onContainerClick();
  }

  writeValue(value: SelectValue<T>) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.select.disabled = isDisabled;
  }
}
