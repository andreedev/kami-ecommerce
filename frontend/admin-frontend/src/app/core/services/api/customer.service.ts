import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { DynamicReport, Customer, Address } from 'app/core/models';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '..';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  async report(query: string, page: number, statusFilter: number | null, dateFilter: {}): Promise<DynamicReport<Customer> | null> {
    try {
      const headers = this.authService.getAuthHeaders();
      const body = { query, page, statusFilter, dateFilter }
      const response: any = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.CUSTOMER_REPORT), body, { headers })
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

  async findAddresses(addresses: Address[]): Promise<Address[] | null> {
    try {
      const body = addresses
      const headers = this.authService.getAuthHeaders();
      const response: any = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.FIND_ADDRESSES), body, { headers })
      );
      return response;
    } catch (error: any) {
      if (error.status === 401) {
        const tokenRefreshed = await this.authService.refreshToken();
        if (!tokenRefreshed) return null;
        return await this.findAddresses(addresses);
      }
      throw error;
    }
  }





}
