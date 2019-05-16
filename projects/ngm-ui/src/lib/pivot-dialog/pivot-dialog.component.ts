import { Component, OnInit, Inject /*,CUSTOM_ELEMENTS_SCHEMA*/ } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { PIVOT_FIELD, PIVOT_AXIS } from '../interfaces/pivot-field';
import { PIVOT_QUICK_SELECTION } from '../interfaces/pivot-quick-selection';
import { PIVOT_CONFIG } from '../interfaces/pivot-config';
import { PIVOT_FIELD_ID } from '../interfaces/pivot-field-id';
import { MatDialogRef , MAT_DIALOG_DATA, MatCheckbox, MatButton } from '@angular/material';
import { PIVOT_RESPONSE_FIELD } from '../interfaces/pivot-response-field';
import { PIVOT_RESPONSE } from '../interfaces/pivot-response';

@Component({
  selector: 'ngm-ui-pivot-dialog',
  templateUrl: './pivot-dialog.component.html',
  styleUrls: ['./pivot-dialog.component.css']
})
export class PivotDialogComponent implements OnInit {

  public quickSelectionTitle: string;

  public save_fieldList: PIVOT_FIELD[];
  public save_columnList: PIVOT_FIELD[];
  public save_valuesList: PIVOT_FIELD[];

  public fieldList: PIVOT_FIELD[];
  public columnList: PIVOT_FIELD[];
  public valuesList: PIVOT_FIELD[];

  public quickSelection: PIVOT_QUICK_SELECTION[];

  public isValid: boolean;
  public isSeleccionRapida: boolean;


  constructor( public dialogRef: MatDialogRef<PIVOT_CONFIG> , @Inject(MAT_DIALOG_DATA) public data: PIVOT_CONFIG )
  {
    this.fieldList = this.clonePivotFields( data.fieldList );
    this.columnList = this.clonePivotFields( data.columnList );
    this.valuesList = this.clonePivotFields( data.valuesList );

    this.save_fieldList = this.clonePivotFields( data.fieldList );
    this.save_columnList = this.clonePivotFields( data.columnList );
    this.save_valuesList = this.clonePivotFields( data.valuesList );

    this.checkFieldsSelection();

    if ( data.quickSelection.length > 0 ) {
      this.isSeleccionRapida = true;
      this.quickSelection = data.quickSelection;

    } else {
      this.isSeleccionRapida = false;
    }

    this.quickSelectionTitle = '';
  }

  //#region 
  /**
   * Moves an item one index in an array to another.
   * @param array Array in which to move the item.
   * @param fromIndex Starting index of the item.
   * @param toIndex Index to which the item should be moved.
   * */
  clonePivotFields( s: PIVOT_FIELD[] ) : PIVOT_FIELD[] {
    let newA = new Array<PIVOT_FIELD>();
    for (let i = 0; i < s.length; i++) {
      newA.push( { deno: s[i].deno, fld: s[i].fld, pivot_axis: s[i].pivot_axis, selected: s[i].selected } );
    }
    return newA;
  }

  /**
   * Check Selections and set 
   * siSelColumns: is true if any column is selected
   * siSelValues: is true if any value is selected
   * siSelFields: is true if any field is selected
   */
  private checkFieldsSelection() : void {
    var siSelFields = false;
    var ix: number;
    for (ix = 0; ix < this.fieldList.length; ix++) {
      if ( this.fieldList[ix].selected === true  ) { siSelFields = true; break; }
    }
    var siSelColumns = false;
    for (ix = 0; ix < this.columnList.length; ix++) {
      if ( this.columnList[ix].selected === true  ) { siSelColumns = true; break; }
    }
    var siSelValues = false;
    for (ix = 0; ix < this.valuesList.length; ix++) {
      if ( this.valuesList[ix].selected === true  ) { siSelValues = true; break; }
    }
    
    if ( siSelFields && siSelValues ) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }  

  /**
   * 
   * @param event : event received from ui
   * @param selectionId : constant expresion or any value indication the name of the selection
   */
  onQuickSelection( event: Event , selectionId: string ) {

    this.fieldList = this.clonePivotFields( this.save_fieldList );
    this.columnList = this.clonePivotFields( this.save_columnList );
    this.valuesList = this.clonePivotFields( this.save_valuesList );

    this.quickSelectionTitle = '';

    if ( selectionId === '__reset__') {
      return;
    }

    this.fieldList.forEach( (o) => o.selected = false );
    this.columnList.forEach( (o) => o.selected = false );
    this.valuesList.forEach( (o) => o.selected = false );

    // Obtener referencia a la preseleccion elejida
    var s = this.quickSelection.find( (f) => f.selecionId === selectionId);

    if ( s === null || s === undefined ) {
      return;
    }

    this.quickSelectionTitle = s.menuName;

    // Transferencia entre Filas a Columnas
    //#region 
    // Pasar de las Columnas a las Filas si es necesario
    this.arrangeToQuickSelection( s.fieldList, this.columnList, this.fieldList );
    // Pasar de las Filas a las Columnas si es Necesario
    this.arrangeToQuickSelection( s.columnList, this.fieldList, this.columnList );
    //#endregion
    
    // Selecciona las Columnas de Valores
    for (let i = 0; i < s.valuesList.length; i++) {
      let v = this.valuesList.find( (o) => o.fld === s.valuesList[i].fld );
      if ( v != null && v != undefined ) {
        v.selected = true;
      }
    }

  }

  /** FIX
   * 
   * @param itemsId : List of Id of pivot field to search on source and move to target if founded
   * @param source : list of pivot fields to seach
   * @param target : list of pivot fields to move on if found
   */
  arrangeToQuickSelection( itemsId: PIVOT_FIELD_ID[], source: PIVOT_FIELD[], target: PIVOT_FIELD[] ) : void {
    for (let ix_id = 0; ix_id < itemsId.length; ix_id++) {
      var enT: PIVOT_FIELD;
      var e_id: string;

      e_id = !!itemsId[ix_id].fld ? itemsId[ix_id].fld : "";
      // Si no esta en targer, lo transfiere desde source
      enT = target.find( (t) => t.fld === e_id );

      if ( enT === null || enT === undefined ) {
        // no esta enT ( target ), se pasa de soure a target
        var targetIx: number;
        var source_ix: number;
        source_ix = 0;
        for (let i = 0; i < source.length; i++) {
          if ( source[i].fld === e_id ) {
            source_ix = i; 
            break;
          }
        }
        targetIx = target.length+1;
        source[source_ix].selected = true;
        transferArrayItem(source, target, source_ix, 0 ); //targetIx);
      } else {
        enT.selected = true;
      }// Fin de transferencia

    }// Fin del Loop de transferencia
  
  }  
  

  /** FIX
   * Tranfer any item from previus and new container if element contraint check is passed, otherwise not transfer item
   * @param event : event containing source and target list
   * @param targetIdentity : origin source indicating the contraint
   */
  drop(event: CdkDragDrop<PIVOT_FIELD[]>, targetIdentity: string) {
    if (event.previousContainer !== event.container) {

      var siOkey: boolean;
      siOkey = false;

      if ( targetIdentity == 'C' && event.previousContainer.data[event.previousIndex].pivot_axis & PIVOT_AXIS.columna ) {
        event.previousContainer.data[event.previousIndex].selected = true;
        siOkey = true;

      } else if ( targetIdentity == 'F' && event.previousContainer.data[event.previousIndex].pivot_axis & PIVOT_AXIS.fila ) {
        siOkey = true;
      } else if ( targetIdentity == 'V') {
        siOkey = true;
      }

      if ( siOkey === true ) {
        transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex, event.currentIndex)
      }
      
    } else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex) 
    }
  }  
  
  /**
   * 
   * @param event 
   * @param chkbox 
   * @param obj 
   * @param f 
   */
  changeFieldEvent(event: Event, chkbox: MatCheckbox, obj: PIVOT_FIELD, f: string) {

    var v = ( f === 'F' ? this.fieldList.find( x => x.fld === obj.fld) 
        : f === 'C' ? this.columnList.find( x => x.fld === obj.fld) 
        : this.valuesList.find( x => x.fld === obj.fld));
    v.selected = chkbox.checked;

    this.checkFieldsSelection();

  }

  //FIX
  onApply() : void {
    let f = new Array<PIVOT_RESPONSE_FIELD>();
    let c = new Array<PIVOT_RESPONSE_FIELD>();
    let v = new Array<PIVOT_RESPONSE_FIELD>();
  
    var i: number;
    for ( i = 0; i < this.fieldList.length; i++) {
      if ( this.fieldList[i].selected === true ) {
        f.push(  { fld: this.fieldList[i].fld, deno: this.fieldList[i].deno } );
      }
    }
    for ( i = 0; i < this.columnList.length; i++) {
      if ( this.columnList[i].selected === true ) {
        c.push(  { fld: this.columnList[i].fld, deno: this.columnList[i].deno } );
      }
    }
    for ( i = 0; i < this.valuesList.length; i++) {
      if ( this.valuesList[i].selected === true ) {
        v.push(  { fld: this.valuesList[i].fld, deno: this.valuesList[i].deno } );
      }
    }

    let res = <PIVOT_RESPONSE>{
      fieldList: f,
      columnList: c,
      valuesList: v
    };

    this.dialogRef.close(res);
  } // Fin de metodo  
  //#endregion


  ngOnInit() {
  }

}
