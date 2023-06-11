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
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: AppRoutes.CUSTOMER_MODULE_NAME,
        loadChildren: () =>
          import('app/modules/customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: AppRoutes.PRODUCT_MODULE_NAME,
        loadChildren: () =>
          import('app/modules/product/product.module').then(m => m.ProductModule)
      },
      {
        path: AppRoutes.CATEGORY_MODULE_NAME,
        loadChildren: () =>
          import('app/modules/category/category.module').then(m => m.CategoryModule)
      },
      {
        path: AppRoutes.HOME_MODULE_NAME,
        loadChildren: () =>
          import('app/modules/home/home.module').then(m => m.HomeModule)
      },
      { path: '', pathMatch: "full", redirectTo: AppRoutes.HOME_MODULE_NAME }
    ],
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/auth/auth.module').then(m => m.AuthModule)
      }
    ],
    canActivate: [UnauthenticatedGuard]
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
