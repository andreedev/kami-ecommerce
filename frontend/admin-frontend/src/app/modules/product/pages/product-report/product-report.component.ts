import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { DynamicReport } from 'app/core/models';
import { Product } from 'app/core/models/product';
import { DataService, ProductService } from 'app/core/services';
import moment from 'moment';

@Component({
  selector: 'product-report',
  templateUrl: './product-report.component.html'
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
    private router: Router
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
    const response: DynamicReport<Product> | null = await this.productService.productReport(this.query, this.currentPage, this.availabilityFilter, dateFilter);
    if (response === null){
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
