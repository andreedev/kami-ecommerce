import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { CustomerReportComponent } from './pages/customer-report/customer-report.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: AppRoutes.CUSTOMER_REPORT_COMPONENT_NAME, component: CustomerReportComponent },
      { path: "", pathMatch: "full", redirectTo: AppRoutes.CUSTOMER_REPORT_COMPONENT_NAME }
    ]
  },
  { path: "", pathMatch: "full", redirectTo: "" },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
