import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule} from '@angular/common/http';


import { PaginatorEspañol } from './paginator-español';

import { MatInputModule, MatPaginatorModule, MatTableModule,
  MatSortModule, MatPaginatorIntl, MatButtonModule, MatDialogModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorEspañol}],
  bootstrap: [AppComponent]
})
export class AppModule { }
