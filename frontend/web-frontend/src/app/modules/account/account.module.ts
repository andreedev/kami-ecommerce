import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    ProfileComponent,
    OrdersComponent
  ],
  imports: [
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
