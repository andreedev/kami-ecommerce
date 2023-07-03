import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { DataService } from 'app/core/services';
import { CartDataService } from 'app/core/services/data/cart-data.service';
import { SearchDataService } from 'app/core/services/data/search-data.service';
import { environment } from 'assets/environments/environment';
import { AuthDataService } from 'app/core/services/data/auth-data.service';
import { AuthStatus } from 'app/core/enums/auth-status';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {
  readonly resourcesUrl: string = environment.resourcesUrl;

  constructor(
    public dataService: DataService,
    public cartDataService: CartDataService,
    private searchDataService: SearchDataService,
    private authDataService: AuthDataService,
    private router: Router
  ) { }

  clear(): void {
    this.searchDataService.searchResults.data.forEach((p) => {
      p.quantity = 0;
    })
    this.cartDataService.clearCart();
    this.cartDataService.cartClearedEvent.emit();
  }

  checkout(): any {
    if (this.authDataService.authStatus.value !== AuthStatus.LOGGED_IN.getName()) {
      return this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME]);
    }
    this.cartDataService.saveCart();
    this.cartDataService.displayCart = false;
    this.router.navigate([AppRoutes.CHECKOUT_MODULE_ROUTE_NAME]);
  }

}
