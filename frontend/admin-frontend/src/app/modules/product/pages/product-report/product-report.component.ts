import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { Product } from 'app/core/models/product';
import { DataService, ProductService } from 'app/core/services';
import moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'product-report',
  templateUrl: './product-report.component.html',
  providers: [MessageService]
})
export class ProductReportComponent implements OnInit {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  query: string = '';
  loading: boolean = true;
  availabilityFilter: boolean | null = null;
  dateFilter: { startDate: any, endDate: any } = {
    startDate: moment().subtract(1, 'months'),
    endDate: moment(),
  };
  maxDate: any
    = moment().format('YYYY-MM-DD');

  productsList: Array<Product> | undefined;
  selectedProduct: Product | undefined;

  currentPage: number = 1;
  totalPages: number = 1;

  pagesUI: any[] = [];

  displayImagesPopUp: boolean = false;
  selectedProductImages: string[] = [];

  constructor(
    public dataService: DataService,
    public productService: ProductService,
    private router: Router,
    private messageService: MessageService
  ) { }

  async ngOnInit() {
    this.dataService.selectedProduct = undefined
  }

  async report(e: any = null): Promise<void> {
    const dateFilter = {
      startDate: Utils.formatDate(this.dateFilter.startDate),
      endDate: Utils.formatDate(this.dateFilter.endDate)
    }
    this.dataService.enableLoading();
    this.loading = true;
    const response = await this.productService.productReport(this.query, this.currentPage, this.availabilityFilter, dateFilter);
    if (response instanceof HttpErrorResponse) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal error' });
    } else if (response === null) {
      this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME]);
    } else if (response.data.length !== 0) {
      this.productsList = response.data;
      this.loading = false;
      this.pagesUI = Utils.generatePagesUIArray(response.totalPages, this.currentPage);
      this.totalPages = response.totalPages;
    }
    this.dataService.disableLoading();
  }


  updatePage(page: number): void {
    this.currentPage = page;
    this.report();
  }

  switchDisplayProductImages(mediaUrls: string[]): void {
    this.selectedProductImages = mediaUrls;
    this.displayImagesPopUp = true;
  }

  updateProduct(product: Product): void {
    this.dataService.selectedProduct = product;
    this.router.navigate([AppRoutes.PRODUCT_UPDATE_COMPONENT_ROUTE_NAME]);
  }
}
