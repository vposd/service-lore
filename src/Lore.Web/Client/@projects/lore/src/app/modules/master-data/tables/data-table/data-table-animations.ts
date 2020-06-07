import {
  trigger,
  sequence,
  animate,
  transition,
  style,
  state,
} from '@angular/animations';

export const RowsAnimation = trigger('rowsAnimation', [
  transition('void => *', [
    style({ height: '*', opacity: '0', 'box-shadow': 'none' }),
    sequence([
      animate(
        '80ms ease',
        style({ height: '*', opacity: '.2', 'box-shadow': 'none' })
      ),
      animate('180ms ease', style({ height: '*', opacity: 1 })),
    ]),
  ]),
]);

export const DetailExpanded = trigger('detailExpand', [
  state('collapsed', style({ height: '0px', minHeight: '0' })),
  state('expanded', style({ height: '*' })),
  transition(
    'expanded <=> collapsed',
    animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
  ),
]);
