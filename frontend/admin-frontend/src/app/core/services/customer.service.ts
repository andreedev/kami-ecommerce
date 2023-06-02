import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Endpoints } from '../constants';
import { Utils } from '../helpers/utils';
import { DynamicReport, Employee } from '../models';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  async customerReport(query: string, page: number, statusFilter: number | null, dateFilter: {}): Promise<DynamicReport<Employee> | null> {
    try {
      const headers = this.dataService.getAuthHeaders();
      const body = { query, page, statusFilter, dateFilter}
      const response: any = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.CUSTOMER_REPORT), body, { headers })
      );
      return response;
  
    } catch (error: any) {
      if (error.status === 401) {
        const tokenRefreshed = await this.authService.refreshToken();
        if (!tokenRefreshed) return null;
        return await this.customerReport(query, page, statusFilter, dateFilter);
      }
      throw error;
    }
  }



}
