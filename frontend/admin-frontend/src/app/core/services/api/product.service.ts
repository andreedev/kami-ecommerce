import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { DynamicReport, Product } from 'app/core/models';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '..';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  async productReport(query: string, page: number, availabilityFilter: any, dateFilter: {}): Promise<DynamicReport<Product> | null> {
    try {
      const headers = this.authService.getAuthHeaders();
      const body = { query, page, availabilityFilter, dateFilter }
      const response: any = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.PRODUCT_REPORT), body, { headers })
      );
      return response;

    } catch (error: any) {
      if (error.status === 401) {
        const tokenRefreshed = await this.authService.refreshToken();
        if (!tokenRefreshed) return null;
        return await this.productReport(query, page, availabilityFilter, dateFilter);
      }
      throw error;
    }
  }

  async createProduct(product: Product): Promise<any> {
    try {
      const headers = this.authService.getAuthHeaders();
      const response = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.PRODUCT_CREATE), product, { headers })
      );
      return response;
    } catch (error: any) {
      if (error.status === 401) {
        const tokenRefreshed = await this.authService.refreshToken();
        if (!tokenRefreshed) return null;
        return await this.createProduct(product);
      }
      return error;
    }
  }

  async updateProduct(product: Product): Promise<any> {
    try {
      const headers = this.authService.getAuthHeaders();
      const response = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.PRODUCT_UPDATE), product, { headers })
      );
      return response;
    } catch (error: any) {
      if (error.status === 401) {
        const tokenRefreshed = await this.authService.refreshToken();
        if (!tokenRefreshed) return null;
        return await this.updateProduct(product);
      }
      return error;
    }
  }



}
