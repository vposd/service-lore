export class FixedHeaderTableOptions {
  CELL_BORDER_CLASS?: string;
  disableResizeListener?: boolean;
}

export class FixedHeaderTable {
  private readonly CELL_BORDER_CLASS = '.table__cell__border';
  private parent: HTMLElement;
  private thead: HTMLElement;
  private mutationObserver: MutationObserver;

  constructor(
    readonly tableElement: HTMLTableElement,
    readonly parentElement?: HTMLElement
  ) {
    this.parent = parentElement || this.tableElement.parentElement;
    this.thead = this.tableElement.querySelector('thead');
    this.mutationObserver = new MutationObserver(() =>
      this.updateBordersHeight()
    );
    this.updateBordersHeight();
    this.observeChanges();
  }

  updateBordersHeight() {
    const that = this;
    const doUpdate = () => {
      const items = this.thead.querySelectorAll(this.CELL_BORDER_CLASS);
      items.forEach((el: HTMLElement) => (el.style.height = `0px`));
      const height = that.parent.scrollHeight;
      items.forEach((el: HTMLElement) => (el.style.height = `${height}px`));
    };
    requestAnimationFrame(doUpdate);
  }

  destroy() {
    this.mutationObserver.disconnect();
  }

  private observeChanges() {
    this.mutationObserver.observe(this.thead, {
      childList: true,
      subtree: true
    });
  }
}
