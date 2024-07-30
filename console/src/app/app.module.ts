import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrgsComponent } from './components/orgs/orgs.component';
import { LicensesComponent } from './components/licenses/licenses.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MaterialModule } from 'material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { UpdatepopupComponent } from './components/updatepopup/updatepopup.component';
import { UserComponent } from './components/user/user.component';
import { SensorComponent } from './components/sensor/sensor.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChartComponent } from './components/charts/chart/chart.component';
import { AddDevicesComponent } from './components/add-devices/add-devices.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SensorDataComponent } from './components/sensor-data/sensor-data.component';
import { InfopopupComponent } from './components/infopopup/infopopup.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddOrgsComponent } from './components/orgs/add-orgs/add-orgs.component';
import { AddLicenseComponent } from './components/licenses/add-license/add-license.component';
import { UpdateLicenseComponent } from './components/licenses/update-license/update-license.component';
import { UpdateOrgsComponent } from './components/orgs/update-orgs/update-orgs.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { UpdateDevicesComponent } from './components/sensor/update-devices/update-devices.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DashboardComponent,
    OrgsComponent,
    LicensesComponent,
    LoginPageComponent,
    RegisterPageComponent,
    UpdatepopupComponent,
    UserComponent,
    SensorComponent,
    ChartComponent,
    AddDevicesComponent,
    SensorDataComponent,
    InfopopupComponent,
    ErrorsComponent,
    AddOrgsComponent,
    AddLicenseComponent,
    UpdateLicenseComponent,
    UpdateOrgsComponent,
    AddUserComponent,
    UpdateDevicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  exports: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DashboardComponent,
    OrgsComponent,
    LicensesComponent
  ]
})
export class AppModule { }
