import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataService, CartDataService, SearchDataService, ProductModalDataService, CategoryDataService, AuthDataService, OrderDataService } from './core/services';
import { AddressDataService } from './core/services/data/address-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    private dataService: DataService,
    private cartDataService: CartDataService,
    private searchDataService: SearchDataService,
    private productModalDataService: ProductModalDataService,
    private categoryDataService: CategoryDataService,
    private authDataService: AuthDataService,
    private cookieService: CookieService,
    private addressDataService: AddressDataService,
    private orderDataService: OrderDataService
  ) { }
  
  debug(): void {
    console.log(this.dataService);
    console.log(this.authDataService);
    console.log(this.cartDataService);
    console.log(this.searchDataService);
    console.log(this.productModalDataService);
    console.log(this.categoryDataService);
    console.log(this.addressDataService);
    console.log(this.orderDataService);
    // console.log(this.cookieService.get((Constants.SESSION_TOKEN_NAME)));
    // console.log(this.cookieService.get((Constants.REFRESH_SESSION_TOKEN_NAME)));
    
  }

}


