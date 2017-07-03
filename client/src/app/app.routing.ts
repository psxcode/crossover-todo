import { Routes } from '@angular/router';

import {
  DashboardComponent,
  LoginComponent,
} from './components';

import { RoutingGuardService } from './services';

export const routes: Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [RoutingGuardService]},
  {path: 'login', component: LoginComponent, canActivate: [RoutingGuardService]},
  {path: '**', redirectTo: 'login'}
];
