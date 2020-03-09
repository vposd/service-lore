import { trigger, transition, style, animate } from '@angular/animations';

const TRANSITION_DURATION = 180;
const ANIMATION_TRANSITION = `${TRANSITION_DURATION}ms cubic-bezier(0, 0, .2, 1)`;

export const SlideInOutTop = trigger('slideInOutTop', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)', opacity: 0 }),
    animate(
      ANIMATION_TRANSITION,
      style({ transform: 'translateY(0%)', opacity: 1 })
    )
  ]),
  transition(':leave', [
    animate(
      ANIMATION_TRANSITION,
      style({ transform: 'translateY(-100%)', opacity: 0 })
    )
  ])
]);

export const SlideInTop = trigger('slideInTop', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)', opacity: 0 }),
    animate(
      ANIMATION_TRANSITION,
      style({ transform: 'translateY(0%)', opacity: 1 })
    )
  ])
]);

export const SliteInOutBottom = trigger('slideInOutBottom', [
  transition(':enter', [
    style({ transform: 'translateY(100%)', opacity: 0 }),
    animate(
      ANIMATION_TRANSITION,
      style({ transform: 'translateY(0%)', opacity: 1 })
    )
  ]),
  transition(':leave', [
    animate(
      ANIMATION_TRANSITION,
      style({ transform: 'translateY(100%)', opacity: 0 })
    )
  ])
]);

export const SlideInPutRight = trigger('slideInOutRight', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate(
      ANIMATION_TRANSITION,
      style({ transform: 'translateX(0%)', opacity: 1 })
    )
  ]),
  transition(':leave', [
    animate(
      ANIMATION_TRANSITION,
      style({ transform: 'translateX(100%)', opacity: 0 })
    )
  ])
]);
