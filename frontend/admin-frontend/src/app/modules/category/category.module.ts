import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryReportComponent } from './pages/category-report/category-report.component';


@NgModule({
  declarations: [
    CategoryReportComponent
  ],
  imports: [
    SharedModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
