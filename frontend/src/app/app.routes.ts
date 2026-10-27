import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { CarsComponent } from './pages/cars.component';
import { CarDetailComponent } from './pages/car-detail.component';
import { CustomersComponent } from './pages/customers.component';
import { SalesComponent } from './pages/sales.component';
import { BillingComponent } from './pages/billing.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'cars/:id', component: CarDetailComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'billing', component: BillingComponent },
  { path: '**', redirectTo: '' }
];
