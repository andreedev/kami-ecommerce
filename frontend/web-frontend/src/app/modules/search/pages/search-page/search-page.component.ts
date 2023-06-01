import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { DynamicReport, Product, SearchRequest } from 'app/core/models';
import { AuthService, DataService, ProductService } from 'app/core/services';
import { environment } from 'assets/environments/environment';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly constants: typeof Constants = Constants;
  readonly urlResources: string = environment.resourcesUrl;

  viewDesign: string = 'parrilla';
  modalFiltros: boolean = false;
  pages: any[] = [];
  queryCopy: string = '';
  searchResults: DynamicReport<Product> | null = null;

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
        if (!query || query.length < Constants.QUERY_SEARCH_MIN_LENGTH) {
          return this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME]);
        }
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
    if (response!.data.length !== 0) {
      this.searchResults = response;
      this.pages = Utils.generatePagesUIArray(this.searchResults!.data.length, this.searchResults!.totalPages);
      // this.syncProductos();
    }
    this.dataService.searchRequestLoading = false;
    this.dataService.disableLoading();
  }

  applyFilters(): void {
    if (this.dataService.searchRequest.query!.length >= Constants.QUERY_SEARCH_MIN_LENGTH)
    this.search();
  }

  limpiarFiltros(): void {
    // this.dataService.searchRequest = {
    //   filtroIdCatalogo: -1,
    //   filtroIdCategoria: -1,
    //   filtroIdSubcategoria: -1,
    //   filtroIdMarcaProducto: -1,
    //   filtroVehiculo: new Vehiculo(-1, -1, -1, -1),
    //   filtroOrdenProductos: FiltroOrdenProductos.DEFAULT.getCode(),
    //   filtroOferta: false,
    //   filtroPrecioMax: 10000,
    //   page: 1,
    //   query: this.queryCopy,
    //   productos: [],
    //   total: null
    // }
    // this.buscarProductos();
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
