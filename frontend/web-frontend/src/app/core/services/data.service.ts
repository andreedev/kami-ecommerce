import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamicReport, Employee, Product, SearchRequest } from 'app/core/models';
import { CookieService } from 'ngx-cookie-service';
import { Constants } from '../constants';
import { Customer } from '../models/customer';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  screenWidth: number = window.innerWidth

  //loading
  loading: boolean = false

  displayMobileMenu: boolean = false

  loggedInCustomer: Customer | null = null;

  selectedProduct: Product | undefined;

  searchRequest: SearchRequest = {
    query: "",
    onSaleFilter : false,
    page: 1,
    orderFilter: 1,
    categoriesFilter: [],
    inStockFilter: false,
    brand: undefined,
    maxPriceFilter: Constants.PRODUCT_MAX_PRICE
  }

  searchRequestLoading: boolean = false

  displayCart: boolean = false

  cart: Cart = {
    products: [],
    subtotal : 0.00,
    totalAmount : 0
  }

  categories: string[] = []//to do



  constructor(
    private cookieService: CookieService,
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

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders()
    .set('Authorization', `Bearer ${this.cookieService.get(Constants.SESSION_TOKEN_NAME)}`)
    .set('Content-Type', 'application/json')
  }

  clearData():void{
    this.loggedInCustomer=null
    this.displayMobileMenu=false
  }

}
