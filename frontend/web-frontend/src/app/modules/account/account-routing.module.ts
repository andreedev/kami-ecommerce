import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: AppRoutes.PROFILE_COMPONENT_NAME, component: ProfileComponent },
      { path: AppRoutes.PROFILE_COMPONENT_NAME, component: OrdersComponent },
      { path: "", pathMatch: "full", redirectTo: AppRoutes.PROFILE_COMPONENT_NAME }
    ]
  },
  { path: "", pathMatch: "full", redirectTo: "" },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
