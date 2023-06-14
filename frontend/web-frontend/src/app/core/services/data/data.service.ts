import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamicReport, Product, SearchRequest } from 'app/core/models';
import { CookieService } from 'ngx-cookie-service';
import { Constants } from '../../constants';
import { Cart } from '../../models/cart';
import { Customer } from '../../models/customer';
import { Utils } from '../../helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  screenWidth: number = window.innerWidth

  //loading
  loading: boolean = false

  displayMobileMenu: boolean = false

  constructor(
    // private cookieService: CookieService,
  ) {
    this.screenWidth = window.innerWidth;
  }
  /* loading */
  enableLoading(): void {
    setTimeout(() => { this.loading = true }, 0)
  }
  disableLoading(): void {
    setTimeout(() => { this.loading = false }, 0)
  }

}
