  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { firstValueFrom } from 'rxjs';
  import { AuthService } from './auth.service';
import { DataService } from '../data/data.service';
import { Utils } from 'app/core/helpers/utils';
import { Endpoints } from 'app/core/constants';
import { Customer } from 'app/core/models';

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



  }
