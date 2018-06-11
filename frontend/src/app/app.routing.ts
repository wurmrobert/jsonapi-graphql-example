import { Observable } from 'rxjs/Observable';
import { environment } from './../environments/environment';
import { ModuleWithProviders, Injectable } from '@angular/core';
import { CanLoad, Route, RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomersGridComponent } from './components/customers-grid/customers-grid.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'customers', component: CustomersGridComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'customer/:id', component: CustomerComponent }  
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
