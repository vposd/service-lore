import {
  Directive,
  Input,
  ElementRef,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {
  textContent: string;

  @Input() query: string;
  @Input() text: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (!this.query) {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.text);
      return;
    }

    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      this.getFormattedText()
    );
  }

  getFormattedText() {
    const sanitized = (this.query || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regExp = new RegExp(sanitized, 'ig');
    return this.text.replace(
      regExp,
      (s) => `<span class="bg--hightlight">${s}</span>`
    );
  }
}
