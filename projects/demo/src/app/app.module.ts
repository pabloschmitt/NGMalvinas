import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PivotDialogComponent, DynamicTableComponent, MatPaginatorExt } from '@ngm/ui';
import { MatToolbarModule, MatIconModule, MatSelectModule, MatButtonModule, MatInputModule, MatSidenavModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatCardModule, MatDialogModule, MatCheckboxModule, MatStepperModule, MatTabsModule, MatGridListModule, MatMenuModule, MatPaginatorIntl } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { TableBasicExample } from './table-basic-example';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { registerLocaleData } from '@angular/common';
import locale_esAR from '@angular/common/locales/es-AR';

registerLocaleData(locale_esAR);

@NgModule({
  declarations: [
    AppComponent,
    PivotDialogComponent,
    DynamicTableComponent,
    TableBasicExample,
  ],
  entryComponents: [
    PivotDialogComponent,
  ],
  imports: [
    BrowserModule, FormsModule,
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
  providers: [
    { provide: LOCALE_ID, useValue: 'es-AR' },
    { provide: MatPaginatorIntl, useValue: MatPaginatorExt() },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [{provide: LOCALE_ID, useValue: 'es-AR' }]
});
*/