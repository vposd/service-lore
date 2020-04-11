import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

export const DrawerChange = trigger('drawerChange', [
  state(
    'collapsed',
    style({
      width: '80px',
    })
  ),
  state(
    'expanded',
    style({
      width: '180px',
    })
  ),
  transition('* => *', animate(`180ms cubic-bezier(0, 0, .2, 1)`)),
]);

export const DrawerContentChange = trigger('drawerContentChange', [
  state(
    'menu-collapsed',
    style({
      marginLeft: '80px',
    })
  ),
  state(
    'menu-expanded',
    style({
      marginLeft: '180px',
    })
  ),
  transition('* => *', animate(`180ms cubic-bezier(0, 0, .2, 1)`)),
]);
