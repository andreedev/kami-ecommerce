import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as index from './index';
import { CoreModule } from 'app/core/core.module';

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
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProductModalComponent } from './components/product-modal/product-modal.component';

@NgModule({
  //Components
  declarations: [
    ...index.components,
    ProductModalComponent,
  ],

  //Modules imports
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,

    //Ui modules,(
    NgxDaterangepickerMd.forRoot(),
    BlockUIModule,
    ProgressSpinnerModule,
    SidebarModule,
    TableModule,
    ScrollPanelModule,
    DialogModule,
    ChipsModule,
    OverlayPanelModule,

    SharedRoutingModule
  ],

  //Components and modules exports
  exports: [
    ...index.components,
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
    OverlayPanelModule
  ]
})
export class SharedModule { }
