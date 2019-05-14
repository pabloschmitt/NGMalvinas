import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PivotDialogComponent } from '@ngm/ui';
import { MatToolbarModule, MatIconModule, MatSelectModule, MatButtonModule, MatInputModule, MatSidenavModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatCardModule, MatDialogModule, MatCheckboxModule, MatStepperModule, MatTabsModule, MatGridListModule, MatMenuModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PivotDialogComponent,

  ],
  entryComponents: [
    PivotDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,    
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
