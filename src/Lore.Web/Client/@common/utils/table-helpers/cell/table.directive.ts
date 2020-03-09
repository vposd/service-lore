import { Directive, HostListener } from '@angular/core';
import { TableCellDirective } from './table-cell.directive';

import {
  Direction,
  NavigationManager
} from './navigation-manager/navigation-manager';

@Directive({ selector: '[appTable]' })
export class TableDirective {
  private readonly cells: TableCellDirective[][] = [];
  private readonly navigationManager = new NavigationManager();

  addCells(cells: TableCellDirective[]) {
    if (!cells) {
      return;
    }
    cells.forEach(cell => {
      if (!this.cells[cell.appTableCellRowIndex]) {
        this.cells[cell.appTableCellRowIndex] = [];
      }
      this.cells[cell.appTableCellRowIndex][cell.appTableCellColIndex] = cell;
    });
    this.navigationManager.setCells(this.cells);
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.arrowdown', ['$event'])
  async onDown(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.navigationManager.go(Direction.Down);
  }

  @HostListener('keydown.arrowup', ['$event'])
  onArrowUp(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.navigationManager.go(Direction.Up);
  }

  @HostListener('keydown.arrowleft', ['$event'])
  onArrowLeft(event: KeyboardEvent) {
    event.stopPropagation();
    this.navigationManager.go(Direction.Left);
  }

  @HostListener('keydown.arrowright', ['$event'])
  onArrowRight(event: KeyboardEvent) {
    event.stopPropagation();
    this.navigationManager.go(Direction.Right);
  }
}
