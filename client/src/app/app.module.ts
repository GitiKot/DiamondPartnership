import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PartnersComponent } from './components/partners/partners.component';
import { SeriousnessComponent } from './components/seriousness/seriousness.component';
import { SalesComponent } from './components/sales/sales.component';
import { ChecksComponent } from './components/checks/checks.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { PartnersFormComponent } from './components/partners-form/partners-form.component';
import { SalesFormComponent } from './components/sales-form/sales-form.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SerialFormComponent } from './components/serial-form/serial-form.component';
import { ExpensesFormComponent } from './components/expenses-form/expenses-form.component';
import { SucssesModalComponent } from './components/sucsses-modal/sucsses-modal.component';
// import{HttpClientModule} from ''
// import {MatInputModule} from '@angular/material/input';

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';

// import { AppComponent } from 'app/components/app';

// @NgModule({
//     imports: [BrowserModule, FormsModule],
//     declarations: [AppComponent],
//     bootstrap: [AppComponent]
// })

// export class AppModule { }

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
    
    SalesFormComponent,
    HomeComponent,
    NavBarComponent,
    ModalFormComponent,
    ExpensesFormComponent,
    
    SerialFormComponent,
    
    SucssesModalComponent,
    
    
  ],
  imports: [
    
    HttpClientModule,
    BrowserModule,
    AppRoutingModule, ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    
  ], 
  schemas: [NO_ERRORS_SCHEMA] ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }