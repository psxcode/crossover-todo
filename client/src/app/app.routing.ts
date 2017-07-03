import { Routes } from '@angular/router';

import {
  DashboardComponent,
  LoginComponent,
} from './components';

import { RoutingGuardService } from './services';

export const ROUTE_DEFAULT = '';
export const ROUTE_LOGIN = 'login';

export const routes: Routes = [
  {path: ROUTE_DEFAULT, component: DashboardComponent, pathMatch: 'full', canActivate: [RoutingGuardService]},
  {path: ROUTE_LOGIN, component: LoginComponent, canActivate: [RoutingGuardService]},
  {path: '**', redirectTo: ROUTE_LOGIN}
];
