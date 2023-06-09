import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Endpoints } from '../constants';
import { Utils } from '../helpers/utils';
import { DynamicReport } from '../models/rest/dynamic-report';
import { AuthService } from './auth.service';
import { DataService } from './data/data.service';
import { Product, SearchRequest } from '../models';
import { Cart } from 'app/core/models/cart';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  async search(searchRequest: SearchRequest): Promise<DynamicReport<Product> | null> {
    try {
      const body = searchRequest
      const response: any = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.SEARCH), body)
      );
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  async loadGuestCart(request: Product[]): Promise<Cart | null> {
    try {
      const body = request
      const response: any = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.LOAD_GUEST_CART), body)
      );
      return response;
    } catch (error: any) {
      throw error;
    }
  }

}
