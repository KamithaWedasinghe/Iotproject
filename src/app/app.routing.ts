import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard }  from './services/common/auth-guard.service';
import { AddDevicesComponent } from './add-devices/add-devices.component';
import { RegisterEmployeeComponent } from './RegisterIotEmployee/RegisterEmployee.component';
import { UserAccountsComponent } from './user-accounts/user-accounts.component';
import {ViewUserDetailsComponent} from './view-user-details/view-user-details.component';
 
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
  //  canActivate: [AuthGuard],
    component: LoginComponent,
  },
  {
    path:'registerIotEmp',
    component:RegisterEmployeeComponent
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
       },
{
  path:'add-device',
  component:AddDevicesComponent
},
{
  path:'userAccount',
  component:UserAccountsComponent
},
{
  path:'userDetails',
  component:ViewUserDetailsComponent
},
      
    ]
  },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
