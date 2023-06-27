import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderReportComponent } from './pages/order-report/order-report.component';
import { CoreModule } from 'app/core/core.module';
import { OrderProductsModalComponent } from './components/order-products-modal/order-products-modal.component';


@NgModule({
  declarations: [
    OrderReportComponent,
    OrderProductsModalComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
