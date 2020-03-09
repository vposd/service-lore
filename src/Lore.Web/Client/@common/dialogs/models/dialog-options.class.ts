export class DialogOptions<D> {
  component: any;
  data?: D;
  disableClose?: boolean;
  fullscreen?: boolean;
  height?: string;
  panelClass?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  width?: string;
}
