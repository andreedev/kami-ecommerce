import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { Employee } from 'app/core/models';
import { firstValueFrom } from 'rxjs';
import { DataService } from '../data/data.service';
import { AuthService } from './auth.service';

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
