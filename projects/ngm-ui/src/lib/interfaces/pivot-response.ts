import { PIVOT_RESPONSE_FIELD } from './pivot-response-field';

export interface PIVOT_RESPONSE {
    fieldList: PIVOT_RESPONSE_FIELD[];
    columnList: PIVOT_RESPONSE_FIELD[];
    valuesList: PIVOT_RESPONSE_FIELD[];  
  }