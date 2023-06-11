import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { CategoryReportComponent } from './pages/category-report/category-report.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: AppRoutes.CATEGORY_REPORT_COMPONENT_NAME, component: CategoryReportComponent },
      { path: "", pathMatch: "full", redirectTo: AppRoutes.CATEGORY_REPORT_COMPONENT_NAME }
    ]
  },
  { path: "", pathMatch: "full", redirectTo: "" },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
