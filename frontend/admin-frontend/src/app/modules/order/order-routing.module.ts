import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderReportComponent } from './pages/order-report/order-report.component';
import { AppRoutes } from 'app/core/constants';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: AppRoutes.ORDER_REPORT_COMPONENT_NAME, component: OrderReportComponent },
      { path: "", pathMatch: "full", redirectTo: AppRoutes.ORDER_REPORT_COMPONENT_NAME }
    ]
  },
  { path: "", pathMatch: "full", redirectTo: "" },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
