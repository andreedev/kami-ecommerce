import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchLayoutComponent } from './components/search-layout/search-layout.component';

@NgModule({
  declarations: [
    SearchPageComponent,
    SearchLayoutComponent
  ],
  imports: [
    SharedModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
