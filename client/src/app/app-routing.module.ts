import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PartnersComponent } from './components/partners/partners.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SeriousnessComponent } from './components/seriousness/seriousness.component';
import { SalesComponent } from './components/sales/sales.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { ChecksComponent } from './components/checks/checks.component';
import { PartnersFormComponent } from './components/partners-form/partners-form.component';
import { SalesFormComponent } from './components/sales-form/sales-form.component';
import { AppComponent } from './app.component';
import {ModalFormComponent} from './components/modal-form/modal-form.component'
import { SerialFormComponent } from './components/serial-form/serial-form.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'checks', component: ChecksComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'sales/:isSales', component: SalesComponent },
  { path: 'sales-form', component: SalesFormComponent },
  { path: 'seriousness', component: SeriousnessComponent,
  children:[ { path: '', redirectTo: 'seriousness', pathMatch: 'full' }
  ,{path:'serial-form',component:SerialFormComponent}] },

  { path: 'nav-bar', component: NavBarComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'partners-form', component: PartnersFormComponent },
  { path: '123', component: ModalFormComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule{}
