import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

import { UsersComponent } from './pages/users/users.component';
import { UserEditSaComponent } from './pages/users/user-edit-sa/user-edit-sa.component';
import { UserViewSaComponent } from './pages/users/user-view-sa/user-view-sa.component';
import { UserListSaComponent } from './pages/users/user-list-sa/user-list-sa.component';
import { UserAddSaComponent } from './pages/users/user-add-sa/user-add-sa.component';


import {AlertsComponent} from "./pages/alerts/alerts.component";
import {ClientListComponent} from "./pages/client-list/client-list.component";
import {EntityComponent} from "./pages/entity/entity.component";
import { EntityListComponent } from './pages/entity/entity-list/entity-list.component';
import {EntityTypeComponent} from "./pages/entity/entity-type/entity-type.component";
import {SignupComponent} from "./pages/signup/signup.component";
import { RoleComponent } from './pages/role/role.component';
import { DeviceMngmtComponent } from './pages/device-mngmt/device-mngmt.component';
import { DeviceListComponent } from './pages/device-mngmt/device-list/device-list.component';
import { DownlinkCommunicationComponent } from './pages/device-mngmt/downlink-communication/downlink-communication.component';
import { OtaUpdatesComponent } from './pages/device-mngmt/ota-updates/ota-updates.component';
import { DeviceTypeComponent } from './pages/device-mngmt/device-type/device-type.component';
import { DashboardMngmtComponent } from './pages/dashboard-mngmt/dashboard-mngmt.component';
import { RoleListComponent } from './pages/role/role-list/role-list.component';
import { AddRoleComponent } from './pages/role/add-role/add-role.component';
import { EditRoleComponent } from './pages/role/edit-role/edit-role.component';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  // Authentication layout: full-screen, centered form.
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Sign in',
        data: { heading: 'Login', subheading: 'Welcome To SensorVision' },
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: 'Forgot password',
        data: {
          heading: 'Forgot Password',
          subheading: "We'll email you a reset link",
        },
      },
      {
        path: 'signup',
        component: SignupComponent,
        title: 'Sign up',
        data: { heading: 'Sign Up', subheading: 'Create your account' },
      },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
    ],
  },

  // Main application layout: sidebar + top bar. Protected by authGuard.
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
      {
        path: 'user',
        component: UsersComponent,
        title: 'User Component',
        children: [
          {
            path: ':id/edit',
            component: UserEditSaComponent,
            title: 'Edit User',
          },
          {
            path: 'list',
            component: UserListSaComponent,
            title: 'User Listing',
          },
          {
            path: ':id/view',
            component: UserViewSaComponent,
            title: 'View User',
          },
        ],
      },
      {
        path: 'client-list',
        component: ClientListComponent,
        title: 'Client List',
        data: { breadcrumb: ['Client Management', 'Client List'] },
      },
      { path: 'alerts', component: AlertsComponent, title: 'Alerts' },
      { path: 'role', 
        component: RoleComponent, 
        title: 'Role',
        children: [
          {
            path: 'role-list',
            component: RoleListComponent,
            title: 'Role List',
          },
          {
            path: 'add-role',
            component: AddRoleComponent,
            title: 'Add Role',
          },
          {
            path: 'edit-role',
            component: EditRoleComponent,
            title: 'Edit Role',
          },
        ],
       },
      { path: 'clients', component: ClientListComponent, title: 'Clients' },
      {
        path: 'device-mngmt',
        component: DeviceMngmtComponent,
        title: 'Devices',
        children: [
          {
            path: 'device-list',
            component: DeviceListComponent,
            title: 'Device List',
          },
          {
            path: 'device-type',
            component: DeviceTypeComponent,
            title: 'Device Type',
          },
          {
            path: 'downlink-communication',
            component: DownlinkCommunicationComponent,
            title: 'Dowlnlink Communication',
          },
          {
            path: 'ota-updates',
            component: OtaUpdatesComponent,
            title: 'OTA Updates',
          },
        ],
      },
      {
        path: 'entities',
        component: EntityComponent,
        title: 'Entities',
        children: [
          {
            path: 'entity-list',
            component: EntityListComponent,
            title: 'Entity Type',
          },
          {
            path: 'entity-type',
            component: EntityTypeComponent,
            title: 'Entity Type',
          },
        ],
      },
      { path: 'dashboard-mngmt', component: DashboardMngmtComponent, title: 'Dashboard' },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];
