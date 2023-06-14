import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { Endpoints } from '../constants';
import { Constants } from '../constants/constants';
import { Utils } from '../helpers/utils';
import { Customer, Employee } from '../models';
import { LoginResponse } from '../models/rest/login-response';
import { DataService } from './data/data.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthDataService } from './data/auth-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private cookieService: CookieService,
    private authDataService: AuthDataService
  ) { }


  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = this.cookieService.get((Constants.REFRESH_SESSION_TOKEN_NAME))
      const body = { refreshToken }
      const headers = this.dataService.getAuthHeaders()
      const response: LoginResponse = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.REFRESH), body, { headers }))
      this.authDataService.updateSession(response)
      return true
    } catch (error: any) {
      if (error.status === 401) return false
      throw error
    }
  }

  async login(username: string, password: string): Promise<LoginResponse | null> {
    try {
      const body: Employee = { username, password }
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.LOGIN), body))
      return response
    } catch (error: any) {
      if (error.status === 401) return null
      throw error
    }
  }

  async signUp(email: string, password: string): Promise<LoginResponse | null> {
    try {
      const body: Customer = { email, password }
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.REGISTER), body))
      return response
    } catch (error: any) {
      if (error.status === 401) return null
      throw error
    }
  }

}
