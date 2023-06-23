import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';


@NgModule({
  declarations: [
    OrderDetailComponent,
  ],
  imports: [
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
