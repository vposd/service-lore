import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppShellService } from '@common/app-shell/components/app-shell.service';
import { map } from 'rxjs/operators';

@Directive({ selector: '[appTranslateScroll]' })
export class TranslateScrollDirective implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly appShellService: AppShellService
  ) {}

  ngOnInit() {
    this.subscription = this.appShellService.scrollableContent
      .elementScrolled()
      .pipe(
        map(() =>
          this.appShellService.scrollableContent.measureScrollOffset('left')
        )
      )
      .subscribe(offset => {
        this.elementRef.nativeElement.style.transform = `translateX(${offset}px)`;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
