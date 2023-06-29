import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants, Endpoints } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { JwtResponse } from 'app/core/models';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = this.cookieService.get((Constants.REFRESH_SESSION_TOKEN_NAME));
      const body = { refreshToken };
      const headers = this.getAuthHeaders();
      const response: JwtResponse = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.REFRESH), body, { headers }));
      this.cookieService.set(Constants.SESSION_TOKEN_NAME, response.token!)
      this.cookieService.set(Constants.REFRESH_SESSION_TOKEN_NAME, response.refreshToken!)
      return true
    } catch (error: any) {
      if (error.status === 401) {
        this.cookieService.delete(Constants.SESSION_TOKEN_NAME);
        this.cookieService.delete(Constants.REFRESH_SESSION_TOKEN_NAME);
        window.location.reload();
      }
      return false
    }
  }

  async login(username: string, password: string): Promise<JwtResponse | any> {
    try {
      const body = { username, password }
      const response: any = await firstValueFrom(this.http.post(Utils.getURL(Endpoints.LOGIN), body))
      return response
    } catch (error: any) {
      return error;
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
