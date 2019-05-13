import { NgModule } from '@angular/core';
import { PivotDialogComponent } from './pivot-dialog/pivot-dialog.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatCardModule, MatDialogModule, MatCheckboxModule, MatStepperModule, MatTabsModule, MatGridListModule, MatMenuModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    PivotDialogComponent, 
    DynamicTableComponent,
  ],
  imports: [
    // Material
    BrowserAnimationsModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    MatStepperModule,
    DragDropModule,
    MatTabsModule,
    ScrollDispatchModule,
    MatGridListModule,
    MatMenuModule,
    // Material
  ],
  exports: [
    PivotDialogComponent,
    DynamicTableComponent,
  ]
})
export class NgmUiModule { }
