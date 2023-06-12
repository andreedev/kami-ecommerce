import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainBannerComponent } from './components/main-banner/main-banner.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';


@NgModule({
  declarations: [
    HomePageComponent,
    MainBannerComponent,
    CategoryCardComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
