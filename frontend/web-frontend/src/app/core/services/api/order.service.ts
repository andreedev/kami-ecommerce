import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { Order } from 'app/core/models';
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

  async calculatePayment(deliveryMethod: string): Promise<Order | null> {
    try {
      const body = {deliveryMethod}
      const headers = this.authService.getAuthHeaders();
      const response: any = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.CALCULATE_PAYMENT), body, {headers})
      );
      return response;
    } catch (error: any) {
      if (error.status === 401) {
        const tokenRefreshed = await this.authService.refreshToken();
        if (!tokenRefreshed) return null;
        return await this.calculatePayment(deliveryMethod);
      }
      throw error;
    }
  }

  async createOrder(order: Order): Promise<boolean | null> {
    try {
      const body = order
      const headers = this.authService.getAuthHeaders();
      const response: any = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.CREATE_ORDER), body, {headers})
      );
      return response;
    } catch (error: any) {
      if (error.status === 401) {
        const tokenRefreshed = await this.authService.refreshToken();
        if (!tokenRefreshed) return null;
        return await this.createOrder(order);
      }
      throw error;
    }
  }

}
