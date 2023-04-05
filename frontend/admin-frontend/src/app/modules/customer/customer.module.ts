import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerReportComponent } from './pages/customer-report/customer-report.component';


@NgModule({
  declarations: [
    CustomerReportComponent
  ],
  imports: [
    SharedModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
