import { Component, ViewChild, OnInit } from '@angular/core';
import { PivotDialogComponent, PIVOT_RESPONSE, PaginatorPageEvent, PIVOT_CONFIG, PIVOT_AXIS } from '@ngm/ui';
import { MatDialog } from '@angular/material';
import { JsonplaceholderService } from './jsonplaceholder-service';
import { PostDto } from './models';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'demo';

  @ViewChild('table') pivotDlg: PivotDialogComponent;

  private _pivot_response : PIVOT_RESPONSE;
  public fakeData: PostDto[];
  
  constructor( public dialog: MatDialog, private dataService: JsonplaceholderService ) {

  }

  ngOnInit(): void {

    /*
    this.pivotTbl.setColumns( [
      {n:'userId', h:'userId'},
      {n:'id', h:'id'},
      {n:'title', h:'title'},
      {n:'body', h:'body'},
    ] );
  */

    this.dataService.get_posts(0,20).subscribe( (res) => {
      //this.pivottbl.resetModel = true;
      //this.recordsCount = 100;  // FIX: Esto debe ser devuelto de la API
      this.fakeData = res.data.slice(0,20);
      //console.log(this.fakeData);
      console.log(res);
    });

    console.log("-------------------");
  }

  //#region DINAMIC-TABLE - RELACIONADOS ----------------------------------------------
  
  updatePagination(event: PaginatorPageEvent) {
    if ( event.isLoadMoreData ) {
      console.log( `SKIP ${event.skipCount} AND GET NEXT ${event.firtsCount} RECORDS...` );
      this.dataService.get_posts( event.skipCount, event.firtsCount ).subscribe( (res) => {
        console.log(res);
        //this.recordsCount = 100;  // FIX: Esto debe ser devuelto de la API
        var tempData = this.fakeData.slice(0,this.fakeData.length);
        //this.fakeData = res;
        res.data.slice(event.skipCount, event.skipCount+event.firtsCount).forEach( (d: any) => {
          tempData.push(d);
        });
        this.fakeData = tempData;
      });

    }
  }
  //#endregion

  //#region PIVOT DIALOG - RELACIONADOS
  showPivotDialog() : void {

    //#region PIVOT Configuracion
    let dlgData = <PIVOT_CONFIG> { 
      fieldList: [
        { fld: 'Mes_Vto' , deno: 'Mes', pivot_axis: PIVOT_AXIS.fila | PIVOT_AXIS.columna, selected: true },
        { fld: 'Tasa' , deno: 'Tasa', pivot_axis: PIVOT_AXIS.fila },
        { fld: 'Categoria' , deno: 'Categoría', pivot_axis: PIVOT_AXIS.fila | PIVOT_AXIS.columna },
        { fld: 'Reparto' , deno: 'Reparto', pivot_axis: PIVOT_AXIS.fila | PIVOT_AXIS.columna },
        { fld: 'Id_Zdi' , deno: 'Zona de Distribución', pivot_axis: PIVOT_AXIS.fila },
        { fld: 'Id_IZon' , deno: 'Código de Zonificación', pivot_axis: PIVOT_AXIS.fila },
        { fld: 'ZON_Deno' , deno: 'Zonificación', pivot_axis: PIVOT_AXIS.fila  },
        { fld: 'Id_Itv' , deno: 'Código Tipo de Vivienda', pivot_axis: PIVOT_AXIS.fila },
        { fld: 'TV_Deno' , deno: 'Tipo de Vivienda', pivot_axis: PIVOT_AXIS.fila },
        { fld: 'Id_Bar' , deno: 'Código e Barrio', pivot_axis: PIVOT_AXIS.fila },
        { fld: 'BAR_Deno' , deno: 'Barrio', pivot_axis: PIVOT_AXIS.fila },
        { fld: 'BAR_Clase' , deno: 'Clase de Barrio', pivot_axis: PIVOT_AXIS.fila | PIVOT_AXIS.columna },
        { fld: 'EX_Motivo' , deno: 'Tipo de Exlcusión', pivot_axis: PIVOT_AXIS.fila | PIVOT_AXIS.columna },        
      ],
      columnList: [
        
      ],
      valuesList: [
        { fld: 'EM_T' , deno: 'Emisiones', pivot_axis: PIVOT_AXIS.valor, selected: true },
        { fld: 'PG_T' , deno: 'Pagos', pivot_axis: PIVOT_AXIS.valor, selected: true },
        { fld: 'COB_T' , deno: 'Cobrabilidad', pivot_axis: PIVOT_AXIS.valor, selected: true },
        { fld: 'EM_E' , deno: 'EM (Emitido)', pivot_axis: PIVOT_AXIS.valor },
        { fld: 'EM_P' , deno: 'EM (Pagos)', pivot_axis: PIVOT_AXIS.valor },
        { fld: 'RE_E' , deno: 'RE (Emitido)', pivot_axis: PIVOT_AXIS.valor },
        { fld: 'RE_P' , deno: 'RE (Pagos)', pivot_axis: PIVOT_AXIS.valor },
        { fld: 'MU_E' , deno: 'MU (Emitido)', pivot_axis: PIVOT_AXIS.valor },
        { fld: 'MU_P' , deno: 'MU (Pagos)', pivot_axis: PIVOT_AXIS.valor },
        { fld: 'RIMA_E' , deno: 'RIMA (Emitido)', pivot_axis: PIVOT_AXIS.valor },
        { fld: 'RIMA_P' , deno: 'RIMA (Pagos)', pivot_axis: PIVOT_AXIS.valor },
      ],
      quickSelection: [
        { 
          menuName: 'Zona de Distribución',
          selecionId: '1',
          fieldList: [ { fld: 'Mes_Vto'} , { fld: 'Id_Zdi' } ],
          columnList: [ ],
          valuesList: [ { fld: 'EM_T' }, { fld: 'PG_T' }, { fld: 'COB_T' } ]
        },
        { 
          menuName: 'Barrio y Clase',
          selecionId: '2',
          fieldList: [ { fld: 'BAR_Deno' }, { fld: 'Mes_Vto'} ],
          columnList: [ { fld: 'BAR_Clase' } ],
          valuesList: [{ fld: 'EM_T' }, { fld: 'PG_T' }, { fld: 'COB_T' } ]
        }

      ],    
    }
    //#endregion
  
    let dialogRef = this.dialog.open(PivotDialogComponent, {
      width: '500px',
      height: '450px', 
      minHeight: '300px',
      minWidth: '400px',
      data: dlgData,
      
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this._pivot_response = <PIVOT_RESPONSE>result;
        console.log(this._pivot_response);
      }
    });  


  }  
  //#endregion

}
