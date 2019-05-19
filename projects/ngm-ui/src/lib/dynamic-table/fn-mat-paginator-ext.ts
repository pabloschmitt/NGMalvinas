import { MatPaginatorIntl } from '@angular/material';

export function MatPaginatorExt() {
  const paginatorIntl = new MatPaginatorIntl();
  
  paginatorIntl.itemsPerPageLabel = '';

  return paginatorIntl;
}