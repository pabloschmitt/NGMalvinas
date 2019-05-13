import { NgModule } from '@angular/core';
import { NgmUiComponent } from './ngm-ui.component';
import { PivotDialogComponent } from './pivot-dialog/pivot-dialog.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';

@NgModule({
  declarations: [NgmUiComponent, PivotDialogComponent, DynamicTableComponent],
  imports: [
  ],
  exports: [NgmUiComponent]
})
export class NgmUiModule { }
