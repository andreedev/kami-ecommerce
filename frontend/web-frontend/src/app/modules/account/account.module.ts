import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { SharedModule } from 'app/shared/shared.module';
import { AccountLayoutComponent } from './layouts/account-layout/account-layout.component';
import { OrderDetailModalComponent } from './components/order-detail-modal/order-detail-modal.component';


@NgModule({
  declarations: [
    ProfileComponent,
    OrdersComponent,
    AccountLayoutComponent,
    OrderDetailModalComponent
  ],
  imports: [
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
