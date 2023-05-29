import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainBannerComponent } from './components/main-banner/main-banner.component';


@NgModule({
  declarations: [
    HomePageComponent,
    MainBannerComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
