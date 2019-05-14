import { INPUT_DYNAMIC_TABLE_COLUMN } from './input-dynamic-table-column';

export class PIVOT_TABLE_COLUMN {
    columnDef: string; // Name
    cssClass: string; // Css Class
    columnHeader: string; // Header text, is not defined use n as header
    constructor( i: INPUT_DYNAMIC_TABLE_COLUMN ) {
      this.columnDef = i.n;
      this.cssClass = !!i.c ? i.c : "" ;
      this.columnHeader = !!i.h ? i.h : i.n;
    }
  }