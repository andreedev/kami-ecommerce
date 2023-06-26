import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as fromComponents from './index';

//UI
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { BlockUIModule } from 'primeng/blockui';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { SharedRoutingModule } from './shared-routing.module';
import { ChipsModule } from 'primeng/chips';
import { ToastModule } from 'primeng/toast';

@NgModule({
  //Components
  declarations: [
    ...fromComponents.components
  ],

  //Modules imports
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    SharedRoutingModule,

    //Ui modules,(
    NgxDaterangepickerMd.forRoot(),
    BlockUIModule,
    ProgressSpinnerModule,
    SidebarModule,
    TableModule,
    ScrollPanelModule,
    DialogModule,
    ChipsModule,
    ToastModule
  ],

  //Components and modules exports
  exports: [
    ...fromComponents.components,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    //Ui modules
    NgxDaterangepickerMd,
    BlockUIModule,
    ProgressSpinnerModule,
    SidebarModule,
    TableModule,
    ScrollPanelModule,
    DialogModule,
    ChipsModule,
    ToastModule
  ]
})
export class SharedModule { }
