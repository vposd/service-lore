import { Directive, Input, ElementRef } from '@angular/core';
import { isNil } from 'lodash';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input()
  set highlightQuery(value: string) {
    if (isNil(value) || value === this._value) {
      return;
    }

    this._value = value;

    requestAnimationFrame(() =>
      Array.from(
        this.el.nativeElement.querySelectorAll('[highlightTarget]')
      ).forEach(target => this.highlightString(value, target as HTMLElement))
    );
  }

  private _value: string;

  constructor(private el: ElementRef) {}

  private highlightString(query: string, target: HTMLElement) {
    const sanitized = (query || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regExp = new RegExp(sanitized, 'ig');
    this.parse(target, query, regExp);
  }

  private parse(node: HTMLElement, query: string, regexp: RegExp) {
    const result = node.textContent;
    const childNodes = Array.from(node.children)
      .filter(child => child.nodeType !== Node.TEXT_NODE)
      .filter(child => !child.classList.contains('highlight'));

    if (!childNodes.length) {
      node.innerHTML =
        query === ''
          ? result
          : result.replace(
              regexp,
              substr => `<span class="highlight">${substr}</span>`
            );
      return;
    }

    return childNodes.map(n => this.parse(n as HTMLElement, query, regexp));
  }
}
