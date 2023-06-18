import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataService, CartDataService, SearchDataService, ProductModalDataService, CategoryDataService, AuthDataService } from './core/services';

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
  ) { }
  
  debug(): void {
    console.log(this.dataService);
    console.log(this.authDataService);
    console.log(this.cartDataService);
    console.log(this.searchDataService);
    console.log(this.productModalDataService);
    console.log(this.categoryDataService);
    this.authDataService.profileLoadedEvent.emit(false);
    // console.log(this.cookieService.get((Constants.SESSION_TOKEN_NAME)));
    // console.log(this.cookieService.get((Constants.REFRESH_SESSION_TOKEN_NAME)));
    
  }

}


