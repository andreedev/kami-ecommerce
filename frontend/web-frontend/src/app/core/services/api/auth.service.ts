import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { Endpoints } from '../../constants';
import { Constants } from '../../constants/constants';
import { Utils } from '../../helpers/utils';
import { Customer, Employee } from '../../models';
import { LoginResponse } from '../../models/rest/login-response';
import { DataService } from '../data/data.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthDataService } from '../data/auth-data.service';
import { VerifyEmailCodeResponse } from 'app/core/models/rest/verify-email-code-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
  }

  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = this.cookieService.get((Constants.REFRESH_SESSION_TOKEN_NAME))
      const body = { refreshToken }
      const headers = this.getAuthHeaders()
      const response: LoginResponse = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.REFRESH), body, { headers }))
      this.cookieService.set(Constants.SESSION_TOKEN_NAME, response.token!)
      this.cookieService.set(Constants.REFRESH_SESSION_TOKEN_NAME, response.refreshToken!)
      return true
    } catch (error: any) {
      if (error.status === 401){
        this.cookieService.delete(Constants.SESSION_TOKEN_NAME)
        this.cookieService.delete(Constants.REFRESH_SESSION_TOKEN_NAME)
      }
      // throw error
      return false
    }
  }

  async checkEmail(email: string): Promise<boolean | null> {
    try {
      const body = { email }
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.CHECK_EMAIL), body))
      return response
    } catch (error: any) {
      if (error.status === 401) return null
      throw error
    }
  }

  async verifyEmailCode(code: string): Promise<VerifyEmailCodeResponse | HttpErrorResponse> {
    try {
      const body = { code }
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.VERIFY_EMAIL_CODE), body))
      return response
    } catch (error: any) {
      return error
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

  async resolveGoogleAuth(username: string, password: string): Promise<LoginResponse | null> {
    try {
      const body: Employee = { username, password }
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.RESOLVE_GOOGLE_AUTH), body))
      return response
    } catch (error: any) {
      if (error.status === 401) return null
      throw error
    }
  }

  async signUp(customerSignUpRequest: Customer): Promise<LoginResponse | null> {
    try {
      const body = customerSignUpRequest
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.REGISTER), body))
      return response
    } catch (error: any) {
      return error
    }
  }

  async resetPassword(email: string): Promise<boolean | null> {
    try {
      const body = { email }
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.RESET_PASSWORD), body))
      return response
    } catch (error: any) {
      return error
    }
  }

  async verifyResetPassword(code: string, newPassword: string): Promise<boolean | null> {
    try {
      const body = { code, newPassword}
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.VERIFY_RESET_PASSWORD), body))
      return response
    } catch (error: any) {
      return error
    }
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.cookieService.get(Constants.SESSION_TOKEN_NAME)}`)
      .set('Content-Type', 'application/json')
  }

}
