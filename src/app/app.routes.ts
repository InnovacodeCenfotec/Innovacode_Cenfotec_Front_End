import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { SigUpComponent } from './pages/auth/sign-up/signup.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GuestGuard } from './guards/guest.guard';
import { IRoleType } from './interfaces';
import { ProfileComponent } from './pages/profile/profile.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CameraComponent } from './components/camera/camera.component';
import { GaleryComponent } from './pages/galery/galery.component';
import { ApiComponent } from './components/api/api.component';
import { InstagramDashboardComponent } from './pages/instagram-dashboard/instagram-dashboard.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'signup',
    component: SigUpComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'app',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate:[AdminRoleGuard],
        data: { 
          authorities: [
            IRoleType.superAdmin
          ],
          name: 'Usuarios',
          showInSidebar: true
        }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { 
          authorities: [
            IRoleType.superAdmin,
            IRoleType.user
          ],
          name: 'Dashboard',
          showInSidebar: false
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { 
          authorities: [
            IRoleType.superAdmin,
            IRoleType.user
          ],
          name: 'profile',
          showInSidebar: false
        }
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: { 
          authorities: [
            IRoleType.superAdmin,
            IRoleType.user,
          ],
          name: 'Contactenos',
          showInSidebar: true
        }
      },
      {
        path: 'camara',
        component: CameraComponent,
        data: { 
          authorities: [
            IRoleType.superAdmin,
            IRoleType.user,
          ],
          name: 'Camara',
          showInSidebar: true
        }
      },
      {
        path: 'galery',
        component: GaleryComponent,
        data: { 
          authorities: [
            IRoleType.superAdmin,
            IRoleType.user,
          ],
          name: 'Galeria',
          showInSidebar: true
        }
      },
      {
        path: 'api',
        component: ApiComponent,
        data: { 
          authorities: [
            IRoleType.superAdmin,
            IRoleType.user,
          ],
          name: 'Api',
          showInSidebar: true
        }
      },
      {
        path: 'instagram-dashboard',
        component: InstagramDashboardComponent,
        data: { 
          authorities: [
            IRoleType.superAdmin,
            IRoleType.user,
          ],
          name: 'Explorador',
          showInSidebar: true
        }
      },
    ],
  },
];
