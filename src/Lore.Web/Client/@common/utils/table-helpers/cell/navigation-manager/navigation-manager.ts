export enum Direction {
  Up,
  Right,
  Down,
  Left
}

export interface Cell {
  active: boolean;
  appTableCellColIndex: number;
  appTableCellRowIndex: number;

  focus(): void;
}

export class NavigationManager {
  private get columnsCount() {
    return this.cells[0].length;
  }

  private get rowsCount() {
    return this.cells.length;
  }

  constructor(private cells: Cell[][] = [[]]) {}

  setCells(cells: Cell[][]) {
    this.cells = cells;
  }

  go(direction: Direction = Direction.Down) {
    const active = this.getActiveCell();
    if (!active) {
      return;
    }

    let nextCol = active.appTableCellColIndex;
    let nextRow = active.appTableCellRowIndex;

    switch (direction) {
      case Direction.Up:
        nextRow =
          nextRow - 1 >= 0
            ? (nextRow - 1) % this.rowsCount
            : this.rowsCount - 1;
        break;
      case Direction.Right:
        nextCol = (nextCol + 1) % this.columnsCount;
        break;
      case Direction.Left:
        nextCol =
          nextCol - 1 >= 0
            ? (nextCol - 1) % this.columnsCount
            : this.columnsCount - 1;
        break;
      default:
        nextRow = (nextRow + 1) % this.rowsCount;
        break;
    }

    const next = this.cells[nextRow][nextCol];

    if (next) {
      next.focus();
    }
  }

  getActiveCell() {
    // tslint:disable-next-line: prefer-for-of
    for (let row = 0; row < this.cells.length; row++) {
      // tslint:disable-next-line: prefer-for-of
      for (let col = 0; col < this.cells[row].length; col++) {
        if (!this.cells[row][col]) {
          break;
        }
        if (this.cells[row][col].active) {
          return this.cells[row][col];
        }
      }
    }
  }
}
