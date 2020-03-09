import { MatPaginatorIntl } from '@angular/material/paginator';

export function getRussianPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.nextPageLabel = 'Следующая страница';
  paginatorIntl.previousPageLabel = 'Предыдущая страница';
  paginatorIntl.firstPageLabel = 'Первая страница';
  paginatorIntl.lastPageLabel = 'Последняя страница';
  paginatorIntl.itemsPerPageLabel = 'Результатов на странице';
  paginatorIntl.getRangeLabel = (page, pageSize, length) =>
    `Страница ${page + 1} из ${Math.ceil(length / pageSize)}`;

  return paginatorIntl;
}
