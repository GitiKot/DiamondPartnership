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
import { SucssesFormComponent } from './components/sucsses-form/sucsses-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SerialFormComponent } from './components/serial-form/serial-form.component';
import { ExpensesFormComponent } from './components/expenses-form/expenses-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsComponent } from './components/tabs/tabs.component';
import { SalesUpdateComponent } from './components/sales-update/sales-update.component';
import { CheckDetailsComponent } from './components/check-details/check-details.component';
import { CheckFormComponent } from './components/check-form/check-form.component'
// import{HttpClientModule} from ''
// import {MatInputModule} from '@angular/material/input';
// import { CommonModule } from '@angular/common';

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
    // CommonModule,
    SalesFormComponent,
    HomeComponent,
    NavBarComponent,
    SucssesFormComponent,
    ExpensesFormComponent,
    SerialFormComponent,
    TabsComponent,
    SalesUpdateComponent,
    CheckDetailsComponent,
    CheckFormComponent
  ],
  imports: [
    MatTabsModule, HttpClientModule,
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }