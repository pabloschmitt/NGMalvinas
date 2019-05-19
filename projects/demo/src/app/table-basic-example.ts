import { Component, ViewChild, AfterViewInit, OnInit, Input, LOCALE_ID, Inject } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatCheckboxClickAction} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { Time } from '@angular/common';

//https://stackblitz.com/edit/angular-material-data-table-infinite-scroll?file=src%2Fapp%2Fapp.component.html

//https://medium.com/@rohit22173/creating-re-sizable-columns-in-angular2-d22fbcbe39c9

//https://stackblitz.com/edit/mat-table-resize
//https://github.com/angular/components/issues/8312

export enum Ngm_DynCType {
  General = "GEN",
  ShortText = "SHORTT",
  LongText = "LONGT",
  Numeric_Short = "NUMS",
  Numeric_Medium = "NUMM",
  Decimal = "DEC",
  Money = "MONEY",
  Date = "DATE",
  Time = "TIME",
  DateTime = "DATTIME",
  //Buttom = "BTN",
  Boolean = "BOOL",
  //Menu = "MENU",
  TableSelect = "TSEL",
  EndTableColumn = "TEND"
}

export interface Ngm_DynTColumn {
  columnDef: string;
  columnHeader: string;
  ColumnType: Ngm_DynCType;
}

export function Ngm_MakeDynTColumn( cDef: string, cHead: string, cType: Ngm_DynCType ) {
  return <Ngm_DynTColumn> {
    columnDef: cDef,
    columnHeader: cHead,
    ColumnType: cType,
  }; 
}

export var sampleDataList:sampleDto[] = [];


@Component({
  selector: 'table-basic-example',
  styleUrls: ['table-basic-example.scss'],
  templateUrl: 'table-basic-example.html',
})
export class TableBasicExample implements  OnInit, AfterViewInit {
  name = 'Angular Material All Future in one Component ';
  public custSource: any = new MatTableDataSource<sampleDto>(sampleDataList) ;

  public displayedColumns: string[] = []; 

  selectedItems = new SelectionModel<any>(true, []);

  public defColumns_Sticky: Ngm_DynTColumn[] = [];
  public defColumns: Ngm_DynTColumn[] = [];
  public defColumns_StickyEnd: Ngm_DynTColumn[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private toggleColumnNumber = -1;

  constructor() {

    sampleDataList = [];
    for (let index = 0; index < 120; index++) {

      sampleDataList.push( <sampleDto> {
        IdCustomer: index,
        Name: `Name of ${index}`,
        Email: `Email_zz_${index}_@ic.com`,
        Puntos: Math.floor((Math.random() * 100) + 1) / 2,
        Valores: Math.floor((Math.random() * 35000) + 1) / 2,
        Salario: Math.floor((Math.random() * 120000) + 50000) / 3,
        Dateofjoin: new Date(2000+index,1,1),
        HoraEntrada: new Date(0, 0, 0, Math.floor((Math.random() * 24) + 1), Math.floor((Math.random() * 60) + 1), Math.floor((Math.random() * 100) + 1), 0),
        UnaFechaHora: new Date(
          Math.floor((Math.random() * 2001) + 1), Math.floor((Math.random() * 12) + 1), Math.floor((Math.random() * 28) + 1), 
          Math.floor((Math.random() * 24) + 1), Math.floor((Math.random() * 60) + 1), Math.floor((Math.random() * 100) + 1), 0),
        Activo: ( Math.floor((Math.random() * 24) + 1) > 12 ? true : false ),
        Adress1: `Adress1_${index}`,
        Adress2: `Adress2_${index}`,
        Adress3: `Adress3_${index}`,
        SampleValue1: `SampleValue1_${index}`,
        SampleValue2: `SampleValue2_${index}`,
        SampleValue3: `SampleValue3_${index}`,
        SampleValue4: `SampleValue4_${index}`,
        SampleValue5: `SampleValue5_${index}`,
      });
      
    }
    this.custSource = new MatTableDataSource<sampleDto>(sampleDataList) ;

    this.setColumns();
  }


   ngOnInit() {
    this.custSource.sort = this.sort;
    this.custSource.paginator = this.paginator;
  }

  ngAfterViewInit() { 
  }


  setColumns() : void {
    
    this.defColumns_Sticky = [];
    this.defColumns_StickyEnd = [];
    this.displayedColumns = [];
    this.defColumns = [];

    // First CHL Column
    this.defColumns_Sticky.push( Ngm_MakeDynTColumn( "_select", "", Ngm_DynCType.TableSelect ) );
    this.displayedColumns.push( "_select" );

    // Genera Columnas para prueba
    this.defColumns.push( Ngm_MakeDynTColumn( "IdCustomer", "ID.", Ngm_DynCType.Numeric_Short ) );
    this.defColumns.push( Ngm_MakeDynTColumn( "Name", "Nombre", Ngm_DynCType.General ) );

    this.defColumns.push( Ngm_MakeDynTColumn( "Email", "Correo", Ngm_DynCType.General ) );
    this.defColumns.push( Ngm_MakeDynTColumn( "Puntos", "Puntos", Ngm_DynCType.Numeric_Medium ) );
    this.defColumns.push( Ngm_MakeDynTColumn( "Valores", "Valores", Ngm_DynCType.Decimal ) );
    this.defColumns.push( Ngm_MakeDynTColumn( "Salario", "Salario", Ngm_DynCType.Money ) );
    this.defColumns.push( Ngm_MakeDynTColumn( "Dateofjoin", "Fecha", Ngm_DynCType.Date ) );
    this.defColumns.push( Ngm_MakeDynTColumn( "HoraEntrada", "H.Entr.", Ngm_DynCType.Time ) );
    this.defColumns.push( Ngm_MakeDynTColumn( "UnaFechaHora", "UnaFechaHora", Ngm_DynCType.DateTime ) );
    this.defColumns.push( Ngm_MakeDynTColumn( "Activo", "Activo", Ngm_DynCType.Boolean ) );
    //
    //this.defColumns.push( Ngm_MakeDynTColumn( "Boton1", "Click aca", Ngm_DynCType.Buttom ) );
    //
    this.defColumns.push( Ngm_MakeDynTColumn( "Adress1", "Adress1", Ngm_DynCType.LongText ) );
    this.defColumns.push( Ngm_MakeDynTColumn( "Adress2", "Adress2", Ngm_DynCType.General ) );
    this.defColumns.push( Ngm_MakeDynTColumn( "Adress3", "Adress3", Ngm_DynCType.General ) );
    this.defColumns.push( Ngm_MakeDynTColumn( "SampleValue1", "SampleValue1", Ngm_DynCType.General ) );
    this.defColumns.push( Ngm_MakeDynTColumn( "SampleValue2", "SampleValue2", Ngm_DynCType.General ) );
    this.defColumns.push( Ngm_MakeDynTColumn( "SampleValue3", "SampleValue3", Ngm_DynCType.General ) );
    this.defColumns.push( Ngm_MakeDynTColumn( "SampleValue4", "SampleValue4", Ngm_DynCType.General ) );
    this.defColumns.push( Ngm_MakeDynTColumn( "SampleValue5", "SampleValue5", Ngm_DynCType.General ) );
    //////////////////////////////

    this.defColumns.forEach( (dc) => {
      this.displayedColumns.push( dc.columnDef );
    });

    // End Column
    this.defColumns_StickyEnd.push( Ngm_MakeDynTColumn( "_end", "", Ngm_DynCType.EndTableColumn ) );
    this.displayedColumns.push( "_end" );
    /*
    console.log( JSON.stringify( this.defColumns_Sticky ) );
    console.log( JSON.stringify( this.defColumns_StickyEnd ) );
    console.log( JSON.stringify( this.defColumns ) );
    console.log( JSON.stringify( this.displayedColumns ) );

    console.log("end of definition ---------------------------");
    */
  }

  isAllSelected(): boolean {
    const numSelected = this.selectedItems.selected.length;
    const numRows = this.custSource.data.length;
    return numSelected === numRows;
  }

  gettotalcustomercount(): number {
    return sampleDataList.length
  }
  
  SelectAll() {
    this.isAllSelected() ? this.selectedItems.clear() :this.custSource.data.forEach(row => this.selectedItems.select(row));

  }

  applycustomFilter(filterValue: string) {
    this.custSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClick(event: any, rowIndex: number, columnIndex: number, row: any) {
    console.log("EVENT = " + JSON.stringify(event));
    console.log("row = " + JSON.stringify(row));
    console.log("rowIndex = " + rowIndex + " / columnIndex = " + columnIndex);

    //#region  start logic of CheckBoxSelection
    if ( columnIndex === this.toggleColumnNumber )
    {
      if ( rowIndex === -1 ) {
        // Click on header
        if ( this.selectedItems.hasValue() && !this.isAllSelected()) {
          // No esta Todo seleccionado, pero hay algo, se deselecciona
          this.selectedItems.clear();
        } else {
          this.isAllSelected() ? this.selectedItems.clear() :this.custSource.data.forEach(row => this.selectedItems.select(row));
        }
      } else {
        // click on row
        this.selectedItems.toggle(row);
      }
      return null;
    } 
    //#endregion

    //#region start Login of ROW-CLICK event
    
    //#endregion

  }
  
  
}

export class sampleDto {
  public IdCustomer: number;
  public Name: string;
  public Email: string;
  public Puntos: number;
  public Valores: number;
  public Salario: number;
  public Dateofjoin: Date;
  public HoraEntrada: Date;
  public UnaFechaHora: Date;
  public Activo: boolean;
  public Adress1: string;
  public Adress2: string;
  public Adress3: string;
  public SampleValue1: string;
  public SampleValue2: string;
  public SampleValue3: string;
  public SampleValue4: string;
  public SampleValue5: string;
 }

/*
import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { AfterViewInit, OnInit } from '@angular/core';
import {MatSort, } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'table-basic-example',
  styleUrls: ['table-basic-example.css'],
  templateUrl: 'table-basic-example.html',
})
export class TableBasicExample {
  displayedColumns = ['check','position', 'name', 'weight', 'symbol','test','test1','test2','test3','test4','test5','test6','test7','test8'];
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

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */


/*
@Component({
  selector: 'table-basic-example',
  styleUrls: ['table-basic-example.css'],
  templateUrl: 'table-basic-example.html',
})
export class TableBasicExample implements  OnInit, AfterViewInit {
  name = 'Angular Material All Future in one Component ';
  public custSource: any = new MatTableDataSource<customer>(customerData) ;
  public customerdisplayedColumns: string[] =['select','name','age','email','Dateofjoin'];
  selectedcustomers = new SelectionModel<customer>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
   ngOnInit() {
    
    this.custSource.sort = this.sort;
    this.custSource.paginator = this.paginator;
    
  }
  ngAfterViewInit() { 
    
  }

  isAllCustSelected(): boolean {
    const numSelected = this.selectedcustomers.selected.length;
    const numRows = this.custSource.data.length;
    return numSelected === numRows;
  }

  gettotalcustomercount(): number {
    return  customerData.length
  }
  
  SelectAllCustomers() {
    this.isAllCustSelected() ? this.selectedcustomers.clear() :this.custSource.data.forEach(row => this.selectedcustomers.select(row));

  }

  applycustomFilter(filterValue: string) {
    this.custSource.filter = filterValue.trim().toLowerCase();
  }

}

export const customerData: customer[] = [
{name: 'John', age: 25, email: 'john@ic.com', Dateofjoin: new Date(1995,1,1)},
{name: 'Albert', age: 28, email: 'Albert@ic.com', Dateofjoin: new Date(1996,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1997,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1998,1,1)},
{name: 'Arnold', age: 35, email: 'Arnold@ic.com', Dateofjoin: new Date(1999,1,1)},
{name: 'Chad', age: 35, email: 'Chad@ic.com', Dateofjoin: new Date(2000,1,1)},
{name: 'Christian', age: 38, email: 'Christian@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Arthur', age: 45, email: 'Arthur@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Benjamin', age: 17, email: 'Benjamin@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Harry', age: 20, email: 'Harry@ic.com', Dateofjoin: new Date(2001,1,1)},

{name: 'John', age: 25, email: 'john@ic.com', Dateofjoin: new Date(1995,1,1)},
{name: 'Albert', age: 28, email: 'Albert@ic.com', Dateofjoin: new Date(1996,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1997,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1998,1,1)},
{name: 'Arnold', age: 35, email: 'Arnold@ic.com', Dateofjoin: new Date(1999,1,1)},
{name: 'Chad', age: 35, email: 'Chad@ic.com', Dateofjoin: new Date(2000,1,1)},
{name: 'Christian', age: 38, email: 'Christian@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Arthur', age: 45, email: 'Arthur@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Benjamin', age: 17, email: 'Benjamin@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Harry', age: 20, email: 'Harry@ic.com', Dateofjoin: new Date(2001,1,1)},

{name: 'John', age: 25, email: 'john@ic.com', Dateofjoin: new Date(1995,1,1)},
{name: 'Albert', age: 28, email: 'Albert@ic.com', Dateofjoin: new Date(1996,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1997,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1998,1,1)},
{name: 'Arnold', age: 35, email: 'Arnold@ic.com', Dateofjoin: new Date(1999,1,1)},
{name: 'Chad', age: 35, email: 'Chad@ic.com', Dateofjoin: new Date(2000,1,1)},
{name: 'Christian', age: 38, email: 'Christian@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Arthur', age: 45, email: 'Arthur@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Benjamin', age: 17, email: 'Benjamin@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Harry', age: 20, email: 'Harry@ic.com', Dateofjoin: new Date(2001,1,1)},

{name: 'John', age: 25, email: 'john@ic.com', Dateofjoin: new Date(1995,1,1)},
{name: 'Albert', age: 28, email: 'Albert@ic.com', Dateofjoin: new Date(1996,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1997,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1998,1,1)},
{name: 'Arnold', age: 35, email: 'Arnold@ic.com', Dateofjoin: new Date(1999,1,1)},
{name: 'Chad', age: 35, email: 'Chad@ic.com', Dateofjoin: new Date(2000,1,1)},
{name: 'Christian', age: 38, email: 'Christian@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Arthur', age: 45, email: 'Arthur@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Benjamin', age: 17, email: 'Benjamin@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Harry', age: 20, email: 'Harry@ic.com', Dateofjoin: new Date(2001,1,1)},

{name: 'John', age: 25, email: 'john@ic.com', Dateofjoin: new Date(1995,1,1)},
{name: 'Albert', age: 28, email: 'Albert@ic.com', Dateofjoin: new Date(1996,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1997,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1998,1,1)},
{name: 'Arnold', age: 35, email: 'Arnold@ic.com', Dateofjoin: new Date(1999,1,1)},
{name: 'Chad', age: 35, email: 'Chad@ic.com', Dateofjoin: new Date(2000,1,1)},
{name: 'Christian', age: 38, email: 'Christian@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Arthur', age: 45, email: 'Arthur@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Benjamin', age: 17, email: 'Benjamin@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Harry', age: 20, email: 'Harry@ic.com', Dateofjoin: new Date(2001,1,1)},

{name: 'John', age: 25, email: 'john@ic.com', Dateofjoin: new Date(1995,1,1)},
{name: 'Albert', age: 28, email: 'Albert@ic.com', Dateofjoin: new Date(1996,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1997,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1998,1,1)},
{name: 'Arnold', age: 35, email: 'Arnold@ic.com', Dateofjoin: new Date(1999,1,1)},
{name: 'Chad', age: 35, email: 'Chad@ic.com', Dateofjoin: new Date(2000,1,1)},
{name: 'Christian', age: 38, email: 'Christian@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Arthur', age: 45, email: 'Arthur@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Benjamin', age: 17, email: 'Benjamin@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Harry', age: 20, email: 'Harry@ic.com', Dateofjoin: new Date(2001,1,1)},

{name: 'John', age: 25, email: 'john@ic.com', Dateofjoin: new Date(1995,1,1)},
{name: 'Albert', age: 28, email: 'Albert@ic.com', Dateofjoin: new Date(1996,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1997,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1998,1,1)},
{name: 'Arnold', age: 35, email: 'Arnold@ic.com', Dateofjoin: new Date(1999,1,1)},
{name: 'Chad', age: 35, email: 'Chad@ic.com', Dateofjoin: new Date(2000,1,1)},
{name: 'Christian', age: 38, email: 'Christian@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Arthur', age: 45, email: 'Arthur@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Benjamin', age: 17, email: 'Benjamin@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Harry', age: 20, email: 'Harry@ic.com', Dateofjoin: new Date(2001,1,1)},

{name: 'John', age: 25, email: 'john@ic.com', Dateofjoin: new Date(1995,1,1)},
{name: 'Albert', age: 28, email: 'Albert@ic.com', Dateofjoin: new Date(1996,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1997,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1998,1,1)},
{name: 'Arnold', age: 35, email: 'Arnold@ic.com', Dateofjoin: new Date(1999,1,1)},
{name: 'Chad', age: 35, email: 'Chad@ic.com', Dateofjoin: new Date(2000,1,1)},
{name: 'Christian', age: 38, email: 'Christian@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Arthur', age: 45, email: 'Arthur@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Benjamin', age: 17, email: 'Benjamin@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Harry', age: 20, email: 'Harry@ic.com', Dateofjoin: new Date(2001,1,1)},

{name: 'John', age: 25, email: 'john@ic.com', Dateofjoin: new Date(1995,1,1)},
{name: 'Albert', age: 28, email: 'Albert@ic.com', Dateofjoin: new Date(1996,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1997,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1998,1,1)},
{name: 'Arnold', age: 35, email: 'Arnold@ic.com', Dateofjoin: new Date(1999,1,1)},
{name: 'Chad', age: 35, email: 'Chad@ic.com', Dateofjoin: new Date(2000,1,1)},
{name: 'Christian', age: 38, email: 'Christian@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Arthur', age: 45, email: 'Arthur@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Benjamin', age: 17, email: 'Benjamin@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Harry', age: 20, email: 'Harry@ic.com', Dateofjoin: new Date(2001,1,1)},

{name: 'John', age: 25, email: 'john@ic.com', Dateofjoin: new Date(1995,1,1)},
{name: 'Albert', age: 28, email: 'Albert@ic.com', Dateofjoin: new Date(1996,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1997,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1998,1,1)},
{name: 'Arnold', age: 35, email: 'Arnold@ic.com', Dateofjoin: new Date(1999,1,1)},
{name: 'Chad', age: 35, email: 'Chad@ic.com', Dateofjoin: new Date(2000,1,1)},
{name: 'Christian', age: 38, email: 'Christian@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Arthur', age: 45, email: 'Arthur@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Benjamin', age: 17, email: 'Benjamin@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Harry', age: 20, email: 'Harry@ic.com', Dateofjoin: new Date(2001,1,1)},

{name: 'John', age: 25, email: 'john@ic.com', Dateofjoin: new Date(1995,1,1)},
{name: 'Albert', age: 28, email: 'Albert@ic.com', Dateofjoin: new Date(1996,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1997,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1998,1,1)},
{name: 'Arnold', age: 35, email: 'Arnold@ic.com', Dateofjoin: new Date(1999,1,1)},
{name: 'Chad', age: 35, email: 'Chad@ic.com', Dateofjoin: new Date(2000,1,1)},
{name: 'Christian', age: 38, email: 'Christian@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Arthur', age: 45, email: 'Arthur@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Benjamin', age: 17, email: 'Benjamin@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Harry', age: 20, email: 'Harry@ic.com', Dateofjoin: new Date(2001,1,1)},

{name: 'John', age: 25, email: 'john@ic.com', Dateofjoin: new Date(1995,1,1)},
{name: 'Albert', age: 28, email: 'Albert@ic.com', Dateofjoin: new Date(1996,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1997,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1998,1,1)},
{name: 'Arnold', age: 35, email: 'Arnold@ic.com', Dateofjoin: new Date(1999,1,1)},
{name: 'Chad', age: 35, email: 'Chad@ic.com', Dateofjoin: new Date(2000,1,1)},
{name: 'Christian', age: 38, email: 'Christian@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Arthur', age: 45, email: 'Arthur@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Benjamin', age: 17, email: 'Benjamin@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Harry', age: 20, email: 'Harry@ic.com', Dateofjoin: new Date(2001,1,1)},

{name: 'John', age: 25, email: 'john@ic.com', Dateofjoin: new Date(1995,1,1)},
{name: 'Albert', age: 28, email: 'Albert@ic.com', Dateofjoin: new Date(1996,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1997,1,1)},
{name: 'Baldwin', age: 30, email: 'Baldwin@ic.com', Dateofjoin: new Date(1998,1,1)},
{name: 'Arnold', age: 35, email: 'Arnold@ic.com', Dateofjoin: new Date(1999,1,1)},
{name: 'Chad', age: 35, email: 'Chad@ic.com', Dateofjoin: new Date(2000,1,1)},
{name: 'Christian', age: 38, email: 'Christian@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Arthur', age: 45, email: 'Arthur@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Benjamin', age: 17, email: 'Benjamin@ic.com', Dateofjoin: new Date(2001,1,1)},
{name: 'Harry', age: 20, email: 'Harry@ic.com', Dateofjoin: new Date(2001,1,1)},

];

export class customer {
  public name: string;
  public age: number;
  public email: string;
  public Dateofjoin: Date;
 }

*/    