import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LicensesComponent } from './components/licenses/licenses.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { OrgsComponent } from './components/orgs/orgs.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { SensorComponent } from './components/sensor/sensor.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './guard/auth.guard';
import { ErrorsComponent } from './components/errors/errors.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home', 
    component:HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orgs',
    component: OrgsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'licenses',
    component: LicensesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sensor',
    component: SensorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'errors',
    component: ErrorsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
