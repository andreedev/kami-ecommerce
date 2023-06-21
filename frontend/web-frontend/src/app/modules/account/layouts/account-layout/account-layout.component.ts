import { Component } from '@angular/core';
import { AppRoutes } from 'app/core/constants';
import { AuthDataService, DataService } from 'app/core/services';
import { Router } from '@angular/router';
import { AddressDataService } from '../../../../core/services/data/address-data.service';

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styles: [
  ]
})
export class AccountLayoutComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;

  constructor(
    private dataService: DataService,
    public authDataService: AuthDataService,
    public addressDataService: AddressDataService,
    private router: Router
  ) { }

  logout(): void {
    this.authDataService.logout()
    this.dataService.loading = true
    setTimeout(() => {
      this.dataService.loading = false
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
    }, 500);
  }
}
