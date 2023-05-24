import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './core/constants';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { UnauthenticatedGuard } from './core/guards/unauthenticated.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      }
    ],
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: AppRoutes.HOME_MODULE_NAME,
        loadChildren: () => import('app/modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: AppRoutes.ACCOUNT_MODULE_NAME,
        loadChildren: () => import('app/modules/account/account.module').then(m => m.AccountModule),
          canActivate: [AuthenticatedGuard]
      },
      // {
      //   path: AppRoutes.PRODUCT_MODULE_NAME,
      //   loadChildren: () => import('app/modules/product/product.module').then(m => m.ProductModule)
      // },
      { path: '', pathMatch: "full", redirectTo: AppRoutes.HOME_MODULE_NAME }
    ],
  },
  { path: "", pathMatch: "full", redirectTo: "" },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
