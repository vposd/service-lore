class SortableGridHeaderItem {
  element: HTMLTableHeaderCellElement;
  index: number;
}

class SortableTableOptions {
  sortIconClass = '.table__cell__icon';
  sortAscClass = 'mdi-arrow-down';
  sortDescClass = 'mdi-arrow-up';
  isFirstColumsSorted?: boolean;
}

export class SortableTable {
  private theadCells: HTMLTableHeaderCellElement[];
  private icons: HTMLElement[] = [];
  private headers: SortableGridHeaderItem[] = [];
  private options = { reverse: true };

  constructor(
    private tableElement: HTMLTableElement,
    private tableOptions: SortableTableOptions = new SortableTableOptions()
  ) {
    this.initSort();
  }

  initSort() {
    this.theadCells = Array.from(this.tableElement.querySelectorAll('th'));

    this.theadCells.forEach((th, index) => {
      const colspan = th.getAttribute('colspan');
      let headerIndex = 0;
      if (index > 0) {
        headerIndex = colspan
          ? this.headers[index - 1].index + +colspan
          : this.headers[index - 1].index + 1;
      } else {
        if (colspan) {
          headerIndex = +colspan;
        }
      }
      this.headers.push({ element: th, index: headerIndex });
      this.initIcons(th, headerIndex);

      th.addEventListener('click', () => this.sortByColumn(index));
    });
  }

  sortByColumn(index: number) {
    if (index === undefined) {
      return;
    }

    const th = this.theadCells[index];
    const by = this.getSortableType(th);

    if (!by) {
      return;
    }

    this.resetIcons();
    this.sortTable(this.headers[index].index, by);
  }

  private sortTable(col: number, type: 'string' | 'number' | 'date') {
    const tbodyElement = this.tableElement.querySelector('tbody');
    const rowsArray: HTMLTableRowElement[] = [].slice.call(tbodyElement.rows);
    const sortFunction = this.getSortFunction(col, type);

    const icon = this.icons[col];

    rowsArray.sort(sortFunction);
    this.options.reverse = !this.options.reverse;

    if (!icon) {
      throw new Error('[sortTable] Icon element is not defined');
    }

    icon.classList.add(this.getIconClass());
    icon.style.opacity = '1';

    rowsArray.forEach(row => tbodyElement.appendChild(row));
  }

  private getSortFunction(col: number, typeName: 'string' | 'number' | 'date') {
    let func: (rowA: HTMLTableRowElement, rowB: HTMLTableRowElement) => 1 | -1;

    const compare = (a, b) => {
      if (this.options.reverse) {
        return a > b ? 1 : -1;
      }
      return a > b ? -1 : 1;
    };

    const compareString = (
      rowA: HTMLTableRowElement,
      rowB: HTMLTableRowElement
    ) => {
      const stringA = rowA.cells[col].innerHTML.toLowerCase();
      const stringB = rowB.cells[col].innerHTML.toLowerCase();
      return compare(stringA, stringB);
    };

    const compareNumber = (
      rowA: HTMLTableRowElement,
      rowB: HTMLTableRowElement
    ) => {
      const numberA =
        parseFloat(rowA.cells[col].innerHTML.replace(/\D/g, '')) || 0;
      const numberB =
        parseFloat(rowB.cells[col].innerHTML.replace(/\D/g, '')) || 0;

      return compare(numberA, numberB);
    };

    const compareDate = (
      rowA: HTMLTableRowElement,
      rowB: HTMLTableRowElement
    ) => {
      const dateA = new Date(rowA.cells[col].innerText).valueOf();
      const dateB = new Date(rowB.cells[col].innerText).valueOf();
      return compare(dateA, dateB);
    };

    if (typeName === 'string') {
      func = compareString;
    }
    if (typeName === 'number') {
      func = compareNumber;
    }
    if (typeName === 'date') {
      func = compareDate;
    }

    return func;
  }

  private getIconClass() {
    return this.options.reverse
      ? this.tableOptions.sortAscClass
      : this.tableOptions.sortDescClass;
  }

  private resetIcons() {
    this.icons.forEach(icon => {
      icon.style.opacity = '0';
      icon.classList.remove(this.getIconClass());
    });
  }

  private initIcons(th: HTMLTableHeaderCellElement, headerIndex: number) {
    const icon = th.querySelector(
      this.tableOptions.sortIconClass
    ) as HTMLElement;

    if (!icon) {
      return;
    }

    this.icons[headerIndex] = icon;
    this.resetIcons();
  }

  private getSortableType(th: HTMLTableCellElement) {
    return th ? (th.getAttribute('sortable') as 'string') : 'string';
  }
}
