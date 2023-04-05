import { Component } from '@angular/core';
import { AppRoutes } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { DynamicReport } from 'app/core/models/dynamic-report';
import { Product } from 'app/core/models/product';
import { DataService, ProductService } from 'app/core/services';
import moment from 'moment';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styles: [
  ]
})
export class ProductReportComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  query: string = '';
  loading: boolean = true;
  statusFilter: number|null=null;
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

  uiPaginationArray: any[] = [];

  displayImagesPopUp: boolean = false;
  selectedProductImages: string[] = [];

  constructor(
    public dataService: DataService,
    public productService: ProductService
  ) { }

  async ngOnInit() {
    
  }

  async getReport(e:any=null): Promise<void>{
    const dateFilter = {
      startDate: Utils.prepareDateToSendBack(this.dateFilter.startDate),
      endDate: Utils.prepareDateToSendBack(this.dateFilter.endDate)
    }
    this.dataService.enableLoading();
    this.loading=true;
    const response: DynamicReport<Product> | null = await this.productService.productReport(this.query, this.currentPage, this.statusFilter, dateFilter);
    if (response!.data.length!==0) {
      this.productsList=response!.data;
      this.loading=false;
      Utils.generatePagesUIArray(response!.totalPages, this.currentPage);
    }
    this.dataService.disableLoading();
  }
  

  updatePage(page: number): void {
    this.currentPage = page;
    this.getReport();
  }

  switchDisplayProductImages(mediaUrls: string[]): void {
    this.selectedProductImages = mediaUrls;
    this.displayImagesPopUp=true;
  }

  updateProduct(product: Product): void {

  }
}
