import {
  trigger,
  transition,
  animate,
  style,
  state
} from '@angular/animations';

const SIDEBAR_TRANSITION_DURATION = 180;
const ANIMATION_TRANSITION = `${SIDEBAR_TRANSITION_DURATION}ms cubic-bezier(0, 0, .2, 1)`;

const TransformHeight = trigger('transformHeightAnimation', [
  transition(':enter', [
    style({ opacity: 0, height: 0 }),
    animate(ANIMATION_TRANSITION, style({ opacity: 1, height: '*' }))
  ]),
  transition(':leave', [
    style({ opacity: 1, height: '*' }),
    animate(ANIMATION_TRANSITION, style({ opacity: 0, height: 0 }))
  ])
]);

const SlideInOut = trigger('sidebarSlideInOut', [
  state(
    'hidden',
    style({
      visibility: 'hidden',
      transform: 'translateX(-100%)',
      width: 0,
      zIndex: '-1'
    })
  ),
  state(
    'collapsed',
    style({
      visibility: 'visible',
      transform: 'translateX(0)',
      width: '56px'
    })
  ),
  state(
    'full',
    style({
      visibility: 'visible',
      transform: 'translateX(0)',
      width: '240px'
    })
  ),
  transition('hidden => collapsed', animate('0ms')),
  transition(
    'hidden <=> full, full <=> collapsed',
    animate(ANIMATION_TRANSITION)
  )
]);

export const SidebarAnimations = {
  TransformHeight,
  SlideInOut
};
