import {
  animate,
  style,
  transition,
  trigger,
  state
} from '@angular/animations';

const TRANSITION_DURATION = 180;
export const ANIMATION_TRANSITION = `${TRANSITION_DURATION}ms cubic-bezier(0.55, 0, 0.55, 0.2)`;

export const FadeIn = trigger('fadeIn', [
  state('void', style({ opacity: 0 })),
  state('enter', style({ opacity: 1 })),
  transition('void => *', animate(ANIMATION_TRANSITION))
]);

export const FadeOut = trigger('fadeOut', [
  state('void', style({ opacity: 0 })),
  state('enter', style({ opacity: 1 })),
  transition('* => void', animate(ANIMATION_TRANSITION))
]);

export const FadeInOut = trigger('fadeInOut', [
  state('void', style({ opacity: 0 })),
  state('enter', style({ opacity: 1 })),
  transition('* => void', animate(ANIMATION_TRANSITION)),
  transition('void => *', animate(ANIMATION_TRANSITION))
]);
