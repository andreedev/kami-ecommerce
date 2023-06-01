import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SearchRoutingModule } from './search-routing.module';
import { CoreModule } from 'app/core/core.module';

@NgModule({
  declarations: [
    SearchPageComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
