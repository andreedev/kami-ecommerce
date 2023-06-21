  import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { Address, ApiResponse, Customer } from 'app/core/models';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

  @Injectable({
    providedIn: 'root'
  })
  export class CustomerService {

    constructor(
      private http: HttpClient,
      private authService: AuthService
    ) { }

    async getProfile(): Promise<Customer | null> {
      try {
        const headers = this.authService.getAuthHeaders();
        const response: any = await firstValueFrom(
          this.http.get(Utils.getURL(Endpoints.PROFILE), {headers})
        );
        return response;
      } catch (error: any) {
        if (error.status === 401) {
          const tokenRefreshed = await this.authService.refreshToken();
          if (!tokenRefreshed) return null;
          return await this.getProfile();
        }
        throw error;
      }
    }

    async saveAddress(address: Address): Promise<ApiResponse | null> {
      try {
        const body = address
        const headers = this.authService.getAuthHeaders();
        const response: any = await firstValueFrom(
          this.http.post(Utils.getURL(Endpoints.SAVE_ADDRESS), body, {headers})
        );
        return response;
      } catch (error: any) {
        if (error.status === 401) {
          const tokenRefreshed = await this.authService.refreshToken();
          if (!tokenRefreshed) return null;
          return await this.saveAddress(address);
        }
        throw error;
      }
    }

    async deleteAddress(id: string): Promise<boolean | null> {
      try {
        const body = {id}
        const headers = this.authService.getAuthHeaders();
        const response: any = await firstValueFrom(
          this.http.delete(Utils.getURL(Endpoints.DELETE_ADDRESS), {headers, body})
        );
        return response;
      } catch (error: any) {
        if (error.status === 401) {
          const tokenRefreshed = await this.authService.refreshToken();
          if (!tokenRefreshed) return null;
          return await this.deleteAddress(id);
        }
        throw error;
      }
    }

  }
