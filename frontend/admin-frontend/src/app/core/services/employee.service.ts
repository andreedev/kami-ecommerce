import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Endpoints } from '../constants';
import { Utils } from '../helpers/utils';
import { Employee } from '../models';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  async getEmployee(): Promise<Employee | null> {
    try {
      const headers = this.dataService.getAuthHeaders();
      const response = await firstValueFrom(
        this.http.get(Utils.getURL(Endpoints.GET_EMPLOYEE), { headers })
      );
      return response;
  
    } catch (error: any) {
      if (error.status === 401) {
        const tokenRefreshed = await this.authService.refreshToken();
        if (!tokenRefreshed) return null;
        return await this.getEmployee();
      }
      throw error;
    }
  }



}
