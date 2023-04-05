import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { ProductReportComponent } from './pages/product-report/product-report.component';
import { ProductUpdateComponent } from './pages/product-update/product-update.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: AppRoutes.PRODUCT_REPORT_COMPONENT_NAME, component: ProductReportComponent },
      { path: AppRoutes.PRODUCT_CREATE_COMPONENT_NAME, component: ProductCreateComponent },
      { path: AppRoutes.PRODUCT_UPDATE_COMPONENT_NAME, component: ProductUpdateComponent },
      { path: "", pathMatch: "full", redirectTo: AppRoutes.PRODUCT_REPORT_COMPONENT_NAME }
    ]
  },
  { path: "", pathMatch: "full", redirectTo: "" },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
