export enum PIVOT_AXIS {
    no = 0,
    fila = 1 << 0,    // 0001 -- the bitshift is unnecessary, but done for consistency
    columna = 1 << 1, // 0010
    valor = 1 << 2,   // 0100
    All = ~(~0 << 2)  // 1011
}

export interface PIVOT_FIELD {
    fld: string;
    deno: string;
    selected?: boolean;
    pivot_axis: PIVOT_AXIS;
}
