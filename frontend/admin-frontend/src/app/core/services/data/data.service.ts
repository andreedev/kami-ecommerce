import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Constants } from '../../constants';
import { Employee } from 'app/core/models';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  screenWidth: number = window.innerWidth

  //loading
  loading: boolean = false

  displayMobileMenu: boolean = false

  loggedInEmployee: Employee | null = null;

  selectedProduct: Product | undefined;

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

  clearData(): void {
    this.loggedInEmployee = null
    this.displayMobileMenu = false

  }

}
