import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryReportComponent } from './pages/category-report/category-report.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { CategoryDeleteComponent } from './components/category-delete/category-delete.component';


@NgModule({
  declarations: [
    CategoryReportComponent,
    CategoryCreateComponent,
    CategoryUpdateComponent,
    CategoryDeleteComponent
  ],
  imports: [
    SharedModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
