export class ToolbarConfig {
  theme?: 'dark' | '' = '';
  homeLinkEnabled? = false;

  constructor(input?: ToolbarConfig) {
    Object.assign(this, input);
  }
}
