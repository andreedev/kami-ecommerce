import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchLayoutComponent } from './components/search-layout/search-layout.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    component: SearchLayoutComponent,
    children: [
      { path: '', component: SearchPageComponent }
    ]
  },
  { path: '', pathMatch: "full", redirectTo: '' },
  { path: "**", redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
