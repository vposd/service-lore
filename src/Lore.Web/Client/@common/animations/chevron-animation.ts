import {
  animate,
  style,
  transition,
  trigger,
  state,
} from '@angular/animations';

export const ChevronAnimation = trigger('chevronAnimation', [
  state('up', style({ display: 'block', transform: 'rotate(180deg)' })),
  state('right', style({ display: 'block', transform: 'rotate(90deg)' })),
  state('down', style({ display: 'block', transform: 'rotate(0deg)' })),
  state('left', style({ display: 'block', transform: 'rotate(270deg)' })),
  transition('* => *', animate(`180ms cubic-bezier(0.55, 0, 0.55, 0.2)`)),
]);
