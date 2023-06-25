import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { environment } from 'assets/environments/environment';
import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es-PE';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
