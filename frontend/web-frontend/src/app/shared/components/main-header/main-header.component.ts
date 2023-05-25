import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { AuthService, DataService } from 'app/core/services';
import { environment } from 'assets/environments/environment';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly resourcesUrl: string = environment.resourcesUrl;

  constructor(
    public authService: AuthService,
    public dataService: DataService,
    private router: Router
  ) { }

  search(): void {
    // if (
    //   this.dataService.busquedaProducto.query != '' &&
    //   this.dataService.busquedaProducto.query.length >= Constants.MIN_LENGTH_QUERY_SEARCH
    // ) {
    //   let qp: BusquedaProductoQueryParams = {};
    //   qp.query = this.dataService.busquedaProducto.query;
    //   this.dataService.go(AppRoutes.SEARCH, { queryParams: qp, queryParamsHandling: "merge" });
    // }
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME])
  }
}
