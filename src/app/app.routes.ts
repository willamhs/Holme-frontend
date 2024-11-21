import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authInverseGuard } from './core/guards/auth-inverse.guard';

export const routes: Routes = [
    {path:'', redirectTo:'auth/login', pathMatch:'full' },

    {
        path: 'home',
        loadChildren: () => import('./pages/public-content/public-content.routes').then(m => m.publicContentRoutes),
    },

    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(a => a.authRoutes),
        canActivate:[authInverseGuard]
    },
    {
        path: 'customer',
        loadChildren: () => import('./pages/student/customer.routes').then(s => s.customerRoutes),
        canActivate:[authGuard]
    },
    {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.routes').then(ad => ad.adminRoutes),
        canActivate:[authGuard]
    }
];
