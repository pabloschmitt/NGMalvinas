import { Component, ViewChild, OnInit } from '@angular/core';
import { PivotDialogComponent, PIVOT_RESPONSE, PaginatorPageEvent, PIVOT_CONFIG, PIVOT_AXIS, ServiceRequestExt } from '@ngm/ui';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { JsonplaceholderService } from './jsonplaceholder-service';
import { PostDto } from './models';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'demo';

  @ViewChild('table') pivotDlg: PivotDialogComponent;

  private _pivot_response : PIVOT_RESPONSE;
  public fakeData: PostDto[] = [];
  public totalRecordsCount: number;
  
  constructor( public dialog: MatDialog, private dataService: JsonplaceholderService ) {

  }


  public getService() {
    return this.dataService;
  }
  
  ngOnInit(): void {

    /*
    var req = <ServiceRequestExt> { skipCount: 0, firtsCount: 20 };

    this.dataService.get_posts( req ).subscribe( (res) => {
      //this.pivottbl.resetModel = true;
      this.totalRecordsCount = res.metaCount;
      this.fakeData = res.data.slice(0,5);
      console.log(res);
    });
*/
  }

  rowLick(event) {
    console.log("rowLick en Parent");
  }

  //#region DINAMIC-TABLE - RELACIONADOS ----------------------------------------------
  
  updatePagination(event: PaginatorPageEvent) { 
    /*
    if ( event.isLoadMoreData ) {
      console.log(JSON.stringify(event));
      console.log( `SKIP ${event.skipCount} AND GET NEXT ${event.firtsCount} RECORDS...` );
      this.dataService.get_posts(  
        <ServiceRequestExt> { 
          skipCount: event.skipCount, firtsCount: event.firtsCount
        } ).subscribe( (res) => {
        console.log(res);
        //this.recordsCount = 100;  // FIX: Esto debe ser devuelto de la API
        var tempData = []; //this.fakeData.slice(0,this.fakeData.length);
        //this.fakeData = res;
        res.data.slice(event.skipCount, event.skipCount+event.firtsCount).forEach( (d: any) => {
          tempData.push(d);
        });
        this.fakeData = tempData;
      });

    }
    */
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


/*
@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

displayedColumns = ['position', 'name', 'weight', 'symbol','test','test1','test2','test3','test4','test5','test6','test7','test8'];
dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
 @ViewChild(MatPaginator) paginator: MatPaginator;
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}
}

export interface Element {
name: string;
position: number;
weight: number;
symbol: string;
test:string;
test1:string;
test2:string;
test3:string;
test4:string;
test5:string;
test6:string;
test7:string;
test8:string;
}

const ELEMENT_DATA: Element[] = [
{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'},
{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'},
{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'},
{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'},
{position: 5, name: 'Boron', weight: 10.811, symbol: 'B',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'},
{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'},
{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'},
{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'},
{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'},
{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'},
{position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'},
{position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'},
{position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'},
{position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'},
{position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'},
{position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'},
{position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl',test:'test',test1:'test1',test2:'text2',test3:'text3',test4:'text4',test5:'text5',test6:'text6',test7:'text7',test8:'text8'}
];

*/