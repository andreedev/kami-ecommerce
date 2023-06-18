  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { firstValueFrom } from 'rxjs';
  import { AuthService } from './auth.service';
import { DataService } from '../data/data.service';
import { Utils } from 'app/core/helpers/utils';
import { Endpoints } from 'app/core/constants';
import { Customer, Product } from 'app/core/models';

  @Injectable({
    providedIn: 'root'
  })
  export class CartService {

    constructor(
      private http: HttpClient,
      private authService: AuthService
    ) { }

    async updateCart(list: Product[]): Promise<boolean | null> {
      try {
        const body = Utils.reduceProductListInfo(list)
        const headers = this.authService.getAuthHeaders();
        const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.UPDATE_CART), body, {headers}));
        console.log('cart updated');
        return response;
      } catch (error: any) {
        if (error.status === 401) {
          const tokenRefreshed = await this.authService.refreshToken();
          if (!tokenRefreshed) return null;
          return await this.updateCart(list);
        }
        throw error;
      }
    }



  }
