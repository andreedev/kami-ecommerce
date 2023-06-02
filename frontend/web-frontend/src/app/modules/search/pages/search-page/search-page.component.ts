import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { DynamicReport, Product } from 'app/core/models';
import { AuthService, DataService, ProductService } from 'app/core/services';
import { environment } from 'assets/environments/environment';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly constants: typeof Constants = Constants;
  readonly urlResources: string = environment.resourcesUrl;

  viewDesign: string = 'grid';
  displayFiltersModal: boolean = false;
  pagesUI: any[] = [];
  queryCopy: string = '';
  searchResults: DynamicReport<Product> = {
    data: [],
    totalPages: 0
  }

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private productService: ProductService,
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.readQueryParams();
    // this.titleService.setTitle(PagesTitles.SEARCH);
  }

  readQueryParams(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (params: Params) => {
        const query: string = params["query"];
        // if (!query || query.length < Constants.QUERY_SEARCH_MIN_LENGTH) {
        //   return this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME]);
        // }
        this.queryCopy = query;
        this.dataService.searchRequest.query = query;
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
    this.dataService.searchRequestLoading = true;
    const response: DynamicReport<Product> | null = await this.productService.search(this.dataService.searchRequest)
    console.log(response);
    this.searchResults = response!;
    this.pagesUI = Utils.generatePagesUIArray(this.searchResults!.totalPages, this.dataService.searchRequest.page!);
    if (response!.data.length !== 0) {
      // this.syncProductos();
    }
    this.dataService.searchRequestLoading = false;
    this.dataService.disableLoading();
  }

  applyFilters(): void {
    // if (this.dataService.searchRequest.query!.length >= Constants.QUERY_SEARCH_MIN_LENGTH)
    this.search();
  }

  clearFilters(): void {
    this.dataService.searchRequest = {
      query: this.queryCopy,
      onSaleFilter : false,
      page: 1,
      orderFilter: 1,
      categoriesFilter: [],
      inStockFilter: false,
      brand: undefined,
      maxPriceFilter: Constants.PRODUCT_MAX_PRICE
    }
    this.search();
  }

  // filtrarMarcaProducto(idMarcaProducto: number): void {
  //   this.dataService.searchRequest.filtroIdMarcaProducto = idMarcaProducto;
  // }

  // filtrarPorCategoria(idCategoria: number): void {
  //   this.dataService.searchRequest.filtroIdCategoria = idCategoria;
  //   this.dataService.searchRequest.filtroIdSubcategoria = -1;
  // }

  productDetails(id: any): void {
    //open product details modal
  }

  updatePage(page: number): void {
    if (page != this.dataService.searchRequest.page) {
      this.dataService.searchRequest.page = page;
      this.search();
    }
  }

  agregarProducto(idProducto: any): void {
    // if (this.authService.verifyUserIsAuthenticated()) {
    //   console.log(1);
    // } else {
    //   this.dataService.go(AppRoutes.LOGIN);

    // }
  }
}
