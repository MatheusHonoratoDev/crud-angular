import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';
import { DialogDetailsComponent } from './components/dialog-details/dialog-details.component';
import { MapComponent } from './components/map/map.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    DialogDetailsComponent,
    MapComponent,
    ConfirmDialogComponent,
    SpinnerComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    CategoryPipe,
    SpinnerComponent
  ]

})
export class SharedModule { }
