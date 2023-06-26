import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Constants, Endpoints, AppRoutes } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { LoginResponse, Employee } from 'app/core/models';
import { DataService } from '..';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private dataService: DataService,
    private router: Router
  ) { }

  updateSession = (res: LoginResponse): void => {
    this.cookieService.set(Constants.SESSION_TOKEN_NAME, res.token!)
    this.cookieService.set(Constants.REFRESH_SESSION_TOKEN_NAME, res.refreshToken!)
  }

  logout(): void {
    this.cookieService.delete(Constants.SESSION_TOKEN_NAME)
    this.cookieService.delete(Constants.REFRESH_SESSION_TOKEN_NAME)
  }

  verifyUserIsAuthenticated(): boolean {
    return this.cookieService.check(Constants.REFRESH_SESSION_TOKEN_NAME)
  }

  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = this.cookieService.get((Constants.REFRESH_SESSION_TOKEN_NAME))
      const body = { refreshToken }
      const headers = this.getAuthHeaders()
      const response: LoginResponse = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.REFRESH), body, { headers }))
      this.updateSession(response)
      return true
    } catch (error: any) {
      if (error.status === 401) {
        this.logout()
        this.redirectToLogin()
        return false
      }
      throw error
    }
  }

  async login(username: string, password: string): Promise<LoginResponse | null> {
    try {
      const body = { username, password }
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.LOGIN), body))
      return response
    } catch (error: any) {
      if (error.status === 401) return null
      throw error
    }
  }

  private redirectToLogin(): void {
    this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME]);
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
