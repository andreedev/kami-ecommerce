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
    private dataService: DataService,
    private authService: AuthService
  ) { }

  async productReport(query: string, page: number, statusFilter: number | null, dateFilter: {}): Promise<DynamicReport<Product> | null> {
    try {
      const headers = this.dataService.getAuthHeaders();
      const body = { query, page, statusFilter, dateFilter }
      const response: any = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.PRODUCT_REPORT), body, { headers })
      );
      return response;

    } catch (error: any) {
      if (error.status === 401) {
        const tokenRefreshed = await this.authService.refreshToken();
        if (!tokenRefreshed) return null;
        return await this.productReport(query, page, statusFilter, dateFilter);
      }
      throw error;
    }
  }

  async createProduct(product: Product): Promise<any> {
    try {
      const headers = this.dataService.getAuthHeaders();
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
      if (error.status === 400) return error;
      throw error;
    }
  }

  async updateProduct(product: Product): Promise<any> {
    try {
      const headers = this.dataService.getAuthHeaders();
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
      if (error.status === 400) return error;
      throw error;
    }
  }



}
