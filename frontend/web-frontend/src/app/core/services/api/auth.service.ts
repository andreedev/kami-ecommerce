import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionResponse } from 'app/core/models/rest/session-response';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { Constants, Endpoints } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { Customer, JwtResponse } from 'app/core/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = this.cookieService.get((Constants.REFRESH_SESSION_TOKEN_NAME))
      const body = { refreshToken }
      const headers = this.getAuthHeaders()
      const response: JwtResponse = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.REFRESH), body, { headers }))
      this.cookieService.set(Constants.SESSION_TOKEN_NAME, response.token!)
      this.cookieService.set(Constants.REFRESH_SESSION_TOKEN_NAME, response.refreshToken!)
      return true
    } catch (error: any) {
      if (error.status === 401) {
        this.cookieService.delete(Constants.SESSION_TOKEN_NAME)
        this.cookieService.delete(Constants.REFRESH_SESSION_TOKEN_NAME)
      }
      return false
    }
  }

  async checkEmail(email: string): Promise<SessionResponse | any> {
    try {
      const body = { email }
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.CHECK_EMAIL), body))
      return response
    } catch (error: any) {
      if (error.status === 401) return null
      throw error
    }
  }

  async verifyEmailCode(code: string): Promise<SessionResponse | HttpErrorResponse> {
    try {
      const body = { code }
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.VERIFY_EMAIL_CODE), body))
      return response
    } catch (error: any) {
      return error
    }
  }

  async resendVerificationEmail(email: string): Promise<number | HttpErrorResponse> {
    try {
      const body = { email }
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.RESEND_VERIFICATION_EMAIL), body))
      return response
    } catch (error: any) {
      return error
    }
  }

  async login(username: string, password: string): Promise<JwtResponse | any> {
    try {
      const body = { username, password }
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.LOGIN), body))
      return response
    } catch (error: any) {
      return error
    }
  }

  async signUp(customerSignUpRequest: Customer): Promise<JwtResponse | any> {
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
      const body = { code, newPassword }
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.VERIFY_RESET_PASSWORD), body))
      return response
    } catch (error: any) {
      return error
    }
  }

  async authenticateWithGoogle(email: string, googleIdToken: string): Promise<SessionResponse | any> {
    try {
      const body = { email, googleIdToken }
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.AUTHENTICATE_WITH_GOOGLE), body))
      return response
    } catch (error: any) {
      throw error
    }
  }

  async linkToGoogleAccount(username: string, password: string, googleIdToken: string): Promise<SessionResponse | any> {
    try {
      const body = { username, password, googleIdToken }
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.LINK_TO_GOOGLE_ACCOUNT), body))
      return response
    } catch (error: any) {
      return error
    }
  }

  async signUpWithGoogle(customer: Customer): Promise<SessionResponse | any> {
    try {
      const body = customer
      const response = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.SIGN_UP_WITH_GOOGLE), body));
      return response
    } catch (error) {
      return error
    }
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.cookieService.get(Constants.SESSION_TOKEN_NAME)}`)
      .set('Content-Type', 'application/json')
  }

  getMultipartHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.cookieService.get(Constants.SESSION_TOKEN_NAME)}`);
  }  

}
