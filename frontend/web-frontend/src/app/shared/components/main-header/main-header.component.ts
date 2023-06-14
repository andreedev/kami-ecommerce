import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { AuthStatus } from 'app/core/enums/auth-status';
import { AuthService, CategoryDataService, DataService } from 'app/core/services';
import { AuthDataService } from 'app/core/services/data/auth-data.service';
import { CartDataService } from 'app/core/services/data/cart-data.service';
import { SearchDataService } from 'app/core/services/data/search-data.service';
import { environment } from 'assets/environments/environment';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html'
})
export class MainHeaderComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly AUTH_STATUS: typeof AuthStatus = AuthStatus;
  readonly resourcesUrl: string = environment.resourcesUrl;

  constructor(
    public authService: AuthService,
    public authDataService: AuthDataService,
    public dataService: DataService,
    public cartDataService: CartDataService,
    public categoryDataService: CategoryDataService,
    public searchDataService: SearchDataService,
    private router: Router
  ) {
  }

  search(): void {
    // if (this.searchDataService.searchRequest.query!.length < Constants.QUERY_SEARCH_MIN_LENGTH) return;
    const queryParams = {
      query : this.searchDataService.searchRequest.query
    };
    this.router.navigate([AppRoutes.SEARCH_MODULE_ROUTE_NAME], { queryParams, queryParamsHandling: "merge" });
  }

  logout(): void {
    this.authDataService.logout()
    this.dataService.loading = true
    setTimeout(() => {
      this.dataService.loading = false
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
    }, 500);
  }

}
