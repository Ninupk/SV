import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserAddComponent } from './pages/user-list/user-add/user-add.component';
import { UserEditComponent } from './pages/user-list/user-edit/user-edit.component';
import {AlertsComponent} from "./pages/alerts/alerts.component";
import {ClientListComponent} from "./pages/client-list/client-list.component";
import {DeviceListComponent} from "./pages/device-mngmt/device-list/device-list.component";
import {DeviceTypeComponent} from "./pages/device-mngmt/device-type/device-type.component";
import {EntityComponent} from "./pages/entity/entity.component";
import {EntityTypeComponent} from "./pages/entity/entity-type/entity-type.component";
import {SignupComponent} from "./pages/signup/signup.component";
import { RoleComponent } from './pages/role/role.component';


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
        path: 'user-list',
        component: UserListComponent,
        title: 'User Listing',
        children: [
          { path: 'user-add', component: UserAddComponent, title: 'Add User' },
          {
            path: 'user-edit',
            component: UserEditComponent,
            title: 'Edit User',
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
      { path: 'role', component: RoleComponent, title: 'Role' },
      { path: 'clients', component: ClientListComponent, title: 'Clients' },
      {
        path: 'devices',
        component: DeviceListComponent,
        title: 'Devices',

        children: [
          {
            path: 'device-types',
            component: DeviceTypeComponent,
            title: 'Device Types',
          },
        ],
      },
      {
        path: 'entities',
        component: EntityComponent,
        title: 'Entities',
        children: [
          {
            path: 'entity-type',
            component: EntityTypeComponent,
            title: 'Entity Type',
          },
        ],
      },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];
