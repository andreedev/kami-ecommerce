import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { ApiResponse, DynamicReport, Order, SessionResponse } from 'app/core/models';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  async calculatePayment(deliveryMethod: string, shippingAddressId: string): Promise<Order | null> {
    try {
      const body = { deliveryMethod, shippingAddressId }
      const headers = this.authService.getAuthHeaders();
      const response: any = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.CALCULATE_PAYMENT), body, { headers })
      );
      return response;
    } catch (error: any) {
      if (error.status === 401) {
        const tokenRefreshed = await this.authService.refreshToken();
        if (!tokenRefreshed) return null;
        return await this.calculatePayment(deliveryMethod, shippingAddressId);
      }
      throw error;
    }
  }

  async createOrder(deliveryMethod: string, shippingAddressId: string, paymentMethod: string, input: HTMLInputElement): Promise<ApiResponse | null> {
    try {
      const formData = new FormData()
      formData.append("deliveryMethod", deliveryMethod)
      formData.append("shippingAddressId", shippingAddressId)
      formData.append("paymentMethod", paymentMethod)
      formData.append("file", input.files![0])
      const headers = this.authService.getMultipartHeaders();
      const response: any = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.CREATE_ORDER), formData, { headers })
      );
      return response;
    } catch (error: any) {
      if (error.status === 401) {
        const tokenRefreshed = await this.authService.refreshToken();
        if (!tokenRefreshed) return null;
        return await this.createOrder(deliveryMethod, shippingAddressId, paymentMethod, input);
      }
      throw error;
    }
  }

  async searchOrders(query: string, page: number, statusFilter: string): Promise<DynamicReport<Order> | null> {
    try {
      const body = { query, page, statusFilter }
      const headers = this.authService.getAuthHeaders();
      const response: any = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.SEARCH_ORDERS), body, { headers })
      );
      return response;
    } catch (error: any) {
      if (error.status === 401) {
        const tokenRefreshed = await this.authService.refreshToken();
        if (!tokenRefreshed) return null;
        return await this.searchOrders(query, page, statusFilter);
      }
      throw error;
    }
  }

  async processOrder(id: string, input: HTMLInputElement): Promise<ApiResponse | null> {
    const formData = new FormData()
    formData.append("id", id)
    formData.append("file", input.files![0])

    try {
      const headers = this.authService.getAuthHeaders();
      const response: any = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.SEARCH_ORDERS), formData, { headers })
      );
      return response;
    } catch (error: any) {
      if (error.status === 401) {
        const tokenRefreshed = await this.authService.refreshToken();
        if (!tokenRefreshed) return null;
        return await this.processOrder(id, input);
      }
      throw error;
    }
  }

}
