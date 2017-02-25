import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
// import {FormControl} from '@angular/forms';

import { AppComponent } from './app.component';


import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { HomeComponent } from './home/home.component';
import {IndexedDBService} from './service/indexed-db.service';
import {MovieDBService} from './service/movie-db.service';
import { Entity } from './model/entity'; // Entity classes.
import { LazyLoadImageModule } from 'ng2-lazyload-image';
import {Ng2PaginationModule} from 'ng2-pagination';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { ModalModule } from 'ng2-bootstrap';
@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, ModalModule.forRoot(), 
    AppRoutingModule, MaterialModule, LazyLoadImageModule, Ng2PaginationModule, NgxChartsModule
  ],
  providers: [IndexedDBService, Entity, MovieDBService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
