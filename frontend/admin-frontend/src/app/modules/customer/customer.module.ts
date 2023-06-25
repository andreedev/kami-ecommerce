import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerReportComponent } from './pages/customer-report/customer-report.component';
import { AddressesModalComponent } from './components/addresses-modal/addresses-modal.component';


@NgModule({
  declarations: [
    CustomerReportComponent,
    AddressesModalComponent
  ],
  imports: [
    SharedModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
