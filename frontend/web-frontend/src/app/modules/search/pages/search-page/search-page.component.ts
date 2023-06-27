import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { DynamicReport, Product } from 'app/core/models';
import { AuthService, DataService, ProductService } from 'app/core/services';
import { SearchDataService } from 'app/core/services/data/search-data.service';
import { environment } from 'assets/environments/environment';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly constants: typeof Constants = Constants;
  readonly resourcesUrl: string = environment.resourcesUrl;

  viewDesign: string = 'grid';
  displayFiltersModal: boolean = false;
  pagesUI: any[] = [];
  queryCopy: string = '';

  constructor(
    private titleService: Title,
    private productService: ProductService,
    public dataService: DataService,
    public searchDataService: SearchDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.readQueryParams();
    // this.titleService.setTitle(PagesTitles.SEARCH);
  }

  readQueryParams(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (params: Params) => {
        if (Object.keys(params).length === 0) {
          this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
          return;
        }
        const query: string = params["query"];
        // if (!query || query.length < Constants.QUERY_SEARCH_MIN_LENGTH) {
        //   return this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME]);
        // }
        this.queryCopy = query;
        this.searchDataService.searchRequest.query = query;

        const categoryFilter: string = params["categoryFilter"];
        if(categoryFilter){
          this.searchDataService.searchRequest.categoriesFilter = [categoryFilter];
        }

        this.search();
        return
      },
      error: err => {
        console.log(err)
      },
      complete: () => {
        console.log('Request complete');
      }
   });
  }

  async search(): Promise<void> {
    this.dataService.enableLoading();
    this.searchDataService.searchRequestLoading = true;
    const response: DynamicReport<Product> | null = await this.productService.search(this.searchDataService.searchRequest)
    this.searchDataService.searchResults = response!;
    this.pagesUI = Utils.generatePagesUIArray(this.searchDataService.searchResults!.totalPages, this.searchDataService.searchRequest.page!);
    this.searchDataService.searchRequestLoading = false;
    this.dataService.disableLoading();
  }

  applyFilters(): void {
    // if (this.dataService.searchRequest.query!.length >= Constants.QUERY_SEARCH_MIN_LENGTH)
    this.search();
  }

  

  clearFilters(): void {
    this.searchDataService.searchRequest = {
      query: this.queryCopy,
      onSaleFilter : false,
      page: 1,
      orderFilter: 1,
      categoriesFilter: [],
      inStockFilter: false,
      brand: undefined,
      maxPriceFilter: Constants.PRODUCT_MAX_PRICE
    }
    this.removeQueryParam()
    this.search();
  }

  removeQueryParam() {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };
    queryParams["categoryFilter"] = null
    this.router.navigate([], { queryParams: queryParams, queryParamsHandling: 'merge' });
  }

  updatePage(page: number): void {
    if (page != this.searchDataService.searchRequest.page) {
      this.searchDataService.searchRequest.page = page;
      this.search();
    }
  }



 












  // clearFiltersFutureVersion(): void {
  //   const queryParams = {
  //     query: this.queryCopy,
  //     onSaleFilter: undefined,
  //     page: undefined,
  //     orderFilter: undefined,
  //     categoriesFilter: undefined,
  //     inStockFilter: undefined,
  //     brand: undefined,
  //     maxPriceFilter: undefined
  //   };
  //   this.router.navigate([AppRoutes.SEARCH_MODULE_ROUTE_NAME], { queryParams, queryParamsHandling: "merge" });
  // }

  // applyFiltersFutureVersion(): void {
  //   // if (this.dataService.searchRequest.query!.length >= Constants.QUERY_SEARCH_MIN_LENGTH)
  //   if (this.searchDataService.searchRequest.inStockFilter){
  //     const queryParams = {
  //       inStockFilter : true
  //     };
  //     this.router.navigate([AppRoutes.SEARCH_MODULE_ROUTE_NAME], { queryParams, queryParamsHandling: "merge" });
  //   } else {
  //     const queryParams = {
  //       inStockFilter : undefined
  //     };
  //     this.router.navigate([AppRoutes.SEARCH_MODULE_ROUTE_NAME], { queryParams, queryParamsHandling: "merge" });
  //   }
  //   // this.search();
  // }

}
