import { NgModule } from '@angular/core';
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
import { SucssesFormComponent } from './components/sucsses-form/sucsses-form.component'
import { SerialFormComponent } from './components/serial-form/serial-form.component';
import { ExpensesFormComponent } from './components/expenses-form/expenses-form.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { CommonModule } from '@angular/common';
import { SalesUpdateComponent } from './components/sales-update/sales-update.component';

const routes: Routes = [
  // { path: '', component: AppComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'checks', component: ChecksComponent},
  {
    path: 'expenses', component: ExpensesComponent,
    children: [{ path: '', redirectTo: 'expenses', pathMatch: 'full' }
      ,
    ]
  },
  //  {
  //       path: 'expenses-form', component: ExpensesFormComponent, children:
  //        [{ path: '', redirectTo: 'expenses-form', pathMatch: 'full' }       
  //      ,  { path: 'sucsses-form/:type', component:ModalFormComponent, }]
  //   },
  { path: 'sales/:isSales', component: SalesComponent },
  { path: 'sales-update', component: SalesUpdateComponent },
  { path: 'sales-form', component: SalesFormComponent, },
 
  
  {
    path: 'seriousness', component: SeriousnessComponent,
    children: [{ path: '', redirectTo: 'seriousness', pathMatch: 'full' }
      , {
        path: 'serial-form', component: SerialFormComponent, children:
         [{ path: '', redirectTo: 'serial-form', pathMatch: 'full' }       
       ,]
    },
    ]
  },
  { path: 'nav-bar', component: NavBarComponent },
  {
    path: 'partners', component: PartnersComponent,
    children: [{ path: '', redirectTo: 'partners', pathMatch: 'full' }
      , {
        path: 'partners-form', component: PartnersFormComponent, children:
         [{ path: '', redirectTo: 'partners-form', pathMatch: 'full' }       
       , ]
    },
    ]
  },
 

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
