import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { UploadComponent } from './Upload/upload.component';
import { LoginComponent } from './login/login.component';
import { HowtoComponent } from './howto/howto.component';
import { AdminmenuComponent } from './adminmenu/adminmenu.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import {HttpClientModule} from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HowtoComponent,
    UploadComponent,
    AdminmenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDocViewerModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    NgChartsModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
