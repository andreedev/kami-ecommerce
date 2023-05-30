import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
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
    if (
      this.dataService.searchRequest.query != '' &&
      this.dataService.searchRequest.query.length >= Constants.QUERY_SEARCH_MIN_LENGTH
    ) {
      const queryParams = {
        query : this.dataService.searchRequest.query
      };
      this.router.navigate([AppRoutes.SEARCH_MODULE_ROUTE_NAME], { queryParams, queryParamsHandling: "merge" });
    }
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME])
  }
}
