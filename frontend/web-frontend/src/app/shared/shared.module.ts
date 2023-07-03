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
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';

@NgModule({
  //Components
  declarations: [
    ...index.components,
  ],

  //Modules imports
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,

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
    OverlayPanelModule,
    GalleriaModule,
    CarouselModule,
    DividerModule,
    InputTextModule,
    RadioButtonModule,
    SkeletonModule,
    ToastModule
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
    OverlayPanelModule,
    GalleriaModule,
    CarouselModule,
    DividerModule,
    InputTextModule ,
    RadioButtonModule,
    SkeletonModule,
    ToastModule
  ]
})
export class SharedModule { }
