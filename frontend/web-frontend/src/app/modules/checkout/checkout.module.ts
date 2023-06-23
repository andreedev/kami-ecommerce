import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';


@NgModule({
  declarations: [
    CheckoutPageComponent
  ],
  imports: [
    SharedModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
