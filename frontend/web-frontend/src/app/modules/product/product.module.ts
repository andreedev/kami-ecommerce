import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { ProductReportComponent } from './pages/product-report/product-report.component';
import { ProductUpdateComponent } from './pages/product-update/product-update.component';
import { ProductRoutingModule } from './product-routing.module';


@NgModule({
  declarations: [
    ProductReportComponent,
    ProductCreateComponent,
    ProductUpdateComponent
  ],
  imports: [
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
