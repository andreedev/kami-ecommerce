import { Component, HostListener, OnInit } from '@angular/core';
import { CartDataService, SearchDataService } from 'app/core/services';
import { CategoryDataService } from 'app/core/services/data/category-data.service';

import { DataService } from 'app/core/services/data/data.service';
import { ProductModalDataService } from 'app/core/services/data/product-modal-data.service';
import { AuthDataService } from '../../../core/services/data/auth-data.service';
import { CookieService } from 'ngx-cookie-service';
import { Constants } from 'app/core/constants';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private cartDataService: CartDataService,
    private searchDataService: SearchDataService,
    private productModalDataService: ProductModalDataService,
    private categoryDataService: CategoryDataService,
    private authDataService: AuthDataService,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.dataService.screenWidth = event.target.innerWidth
  }

  debug(): void {
    console.log(this.dataService);
    console.log(this.authDataService);
    console.log(this.cartDataService);
    console.log(this.searchDataService);
    console.log(this.productModalDataService);
    console.log(this.categoryDataService);
    // console.log(this.cookieService.get((Constants.SESSION_TOKEN_NAME)));
    // console.log(this.cookieService.get((Constants.REFRESH_SESSION_TOKEN_NAME)));
    
  }
}
