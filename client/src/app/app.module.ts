import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { PartnersComponent } from './components/partners/partners.component';
import { SeriousnessComponent } from './components/seriousness/seriousness.component';
import { SalesComponent } from './components/sales/sales.component';
import { ChecksComponent } from './components/checks/checks.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { PartnersFormComponent } from './components/partners-form/partners-form.component';
import { SeriousnessListComponent } from './components/seriousness-list/seriousness-list.component';
import { PrivateSeriousnessListComponent } from './components/private-seriousness-list/private-seriousness-list.component';
import { SalesFormComponent } from './components/sales-form/sales-form.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import{HttpClientModule} from ''
// import {MatInputModule} from '@angular/material/input';




@NgModule({
  declarations: [
    // MatInputModule,
    AppComponent,
    PartnersComponent,
    SeriousnessComponent,
    SalesComponent,
    ChecksComponent,
    ExpensesComponent,
    PartnersFormComponent,
    SeriousnessListComponent,
    PrivateSeriousnessListComponent,
    SalesFormComponent,
    HomeComponent,
    NavBarComponent,
    ModalFormComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule, ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,

  ], 
  schemas: [NO_ERRORS_SCHEMA] ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }