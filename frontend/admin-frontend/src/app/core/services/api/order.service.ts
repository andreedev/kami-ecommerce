import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '..';
import { Endpoints } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { DynamicReport, Order, Product } from 'app/core/models';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  async report(query: string, page: number, statusFilter: string, dateFilter: {}): Promise<DynamicReport<Order> | null | HttpErrorResponse> {
    try {
      const headers = this.authService.getAuthHeaders();
      const body = { query, page, statusFilter, dateFilter }
      const response: any = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.ORDER_REPORT), body, { headers })
      );
      return response;

    } catch (error: any) {
      if (error.status === 401) {
        const tokenRefreshed = await this.authService.refreshToken();
        if (!tokenRefreshed) return null;
        return await this.report(query, page, statusFilter, dateFilter);
      }
      return error;
    }
  }


  async update(request: Order): Promise<any> {
    try {
      const headers = this.authService.getAuthHeaders();
      const response = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.ORDER_UPDATE), request, { headers })
      );
      return response;
    } catch (error: any) {
      if (error.status === 401) {
        const tokenRefreshed = await this.authService.refreshToken();
        if (!tokenRefreshed) return null;
        return await this.update(request);
      }
      return error;
    }
  }
}
