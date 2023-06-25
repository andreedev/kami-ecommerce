import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './core/constants';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { UnauthenticatedGuard } from './core/guards/unauthenticated.guard';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { SecondaryLayoutComponent } from './shared/layouts/secondary-layout/secondary-layout.component';
import { EmptyLayoutComponent } from './shared/layouts/empty-layout/empty-layout.component';

const routes: Routes = [
  {
    path: AppRoutes.AUTH_MODULE_NAME,
    component: EmptyLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      }
    ],
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: AppRoutes.CHECKOUT_MODULE_NAME,
    component: SecondaryLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('app/modules/checkout/checkout.module').then(m => m.CheckoutModule),
        canActivate: [AuthenticatedGuard]
      },
    ],
  },
  // {
  //   path: AppRoutes.ORDER_MODULE_NAME,
  //   component: EmptyLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('app/modules/order/order.module').then(m => m.OrderModule),
  //       canActivate: [AuthenticatedGuard]
  //     },
  //   ],
  // },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: AppRoutes.ACCOUNT_MODULE_NAME,
        loadChildren: () => import('app/modules/account/account.module').then(m => m.AccountModule),
        canActivate: [AuthenticatedGuard]
      },
      {
        path: AppRoutes.SEARCH_MODULE_NAME,
        loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule)
      },
      {
        path: AppRoutes.HOME_MODULE_NAME,
        loadChildren: () => import('app/modules/home/home.module').then(m => m.HomeModule)
      },
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
