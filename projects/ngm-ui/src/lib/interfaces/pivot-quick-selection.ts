import { PIVOT_FIELD_ID } from './pivot-field-id';

export interface PIVOT_QUICK_SELECTION {
    menuName: string;
    selecionId: string;
    fieldList: PIVOT_FIELD_ID[];
    columnList: PIVOT_FIELD_ID[];
    valuesList: PIVOT_FIELD_ID[];  
  }