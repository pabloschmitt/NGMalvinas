import { PIVOT_FIELD } from './pivot-field';
import { PIVOT_QUICK_SELECTION } from './pivot-quick-selection';

export interface PIVOT_CONFIG {
    fieldList: PIVOT_FIELD[];
    columnList: PIVOT_FIELD[];
    valuesList: PIVOT_FIELD[];  
    quickSelection: PIVOT_QUICK_SELECTION[];
  }
  