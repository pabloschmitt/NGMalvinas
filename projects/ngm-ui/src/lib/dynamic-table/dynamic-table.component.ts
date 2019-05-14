import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit, SimpleChanges, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { PaginatorPageEvent } from '../interfaces/paginator-page-event';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { INPUT_PIVOT_TABLE_COLUMN } from '../interfaces/input-pivot-table-column';
import { PIVOT_TABLE_COLUMN } from '../interfaces/pivot-table-column';

@Component({
  selector: 'ngm-ui-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  @Input() defaultColumns: INPUT_PIVOT_TABLE_COLUMN[]=[];
  @Input() dataOrigin: any;
  @Input() metaCount: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() pageEvent = new EventEmitter<PaginatorPageEvent>();
  
  public dataSource: MatTableDataSource<any>; // = new MatTableDataSource(this.dataOrigin);
  public resetModel = false;
  public pageIndex = 0;
  public pageSize = 5;
  public lastDSIndex = -1;
  public length = 0;
  public definedColumns: PIVOT_TABLE_COLUMN[]=[];
  public displayedColumns: string[]=[]; // = ['name'];
  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  
  }

  ngAfterViewInit(): void {
    this.setColumns( this.defaultColumns );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Refresh data source 
    this.dataSource = new MatTableDataSource(this.dataOrigin);
    this.dataSource.paginator = this.paginator;
    this.length = !!this.metaCount ? this.metaCount : this.dataSource.data.length;
    this.dataSource._updatePaginator( this.length );
    
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = this.pageIndex;

    if (this.dataSource.paginator) {
      if ( this.resetModel ) {
        this.paginator.firstPage();
      }
    }
    this.resetModel = false;
  }
  

  onPageEvent(event: PaginatorPageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    // Set default values for the event when is normal paged event wihout need load more items from datasource/service
    event.isLoadMoreData = false;
    event.metaCount = this.metaCount;
    event.skipCount = 0;
    event.firtsCount = 0;
    const ds_lenght = this.dataSource.data.length;
    if ( this.pageSize * (this.pageIndex+1) > ds_lenght ) {
      // need to load more items from datasource/service
      if ( ds_lenght < this.length ) {
        event.isLoadMoreData = true;
        event.skipCount = ds_lenght;
        event.firtsCount = this.pageSize * 4;
      }
      //console.log( `SKIP ${toSkip} AND GET NEXT ${toGet} RECORDS...` );
    }
    //console.log("onPageEvent EMIT en LIBRARY = " + JSON.stringify(event));
    this.pageEvent.emit(event);
  }  

  onRowClick(rowIndex: number, columnIndex: number, event: any) {
    this.lastDSIndex = (( this.pageSize * this.pageIndex) + rowIndex);
    console.log("columnIndex = " + columnIndex); //+ " = " + JSON.stringify( event) );
    console.log("rowIndex =" + rowIndex);
    console.log("this.pageIndex = " + this.pageIndex );
    console.log("this.pageSize = " + this.pageSize );
    console.log("this.lastDSIndex = " + this.lastDSIndex);
    console.log("this.dataSource.data = " + JSON.stringify( this.dataSource.data[this.lastDSIndex] ) );
  }
  
  //#region 

  setColumns( colsdef: INPUT_PIVOT_TABLE_COLUMN[] ) : void {
    this.displayedColumns = [];
    this.definedColumns = [];

    colsdef.forEach( (d) => { 
      // Display Column ID's
      this.displayedColumns.push(d.n);
      // Column attributes
      this.definedColumns.push( new PIVOT_TABLE_COLUMN( d ) )
    });
  }
 
  //#endregion


}
