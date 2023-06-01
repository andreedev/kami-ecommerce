import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SearchRoutingModule } from './search-routing.module';
import { CoreModule } from 'app/core/core.module';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';

@NgModule({
  declarations: [
    SearchPageComponent,
    SearchFiltersComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
