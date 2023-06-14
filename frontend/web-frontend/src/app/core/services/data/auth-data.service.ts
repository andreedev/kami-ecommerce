import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Constants } from 'app/core/constants';
import { Customer, LoginResponse } from 'app/core/models';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  loggedInCustomer: Customer | undefined;

  constructor(
    private cookieService: CookieService,
    public socialAuthService: SocialAuthService
    ) {
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user);
    });
  }
  
  updateSession = (res: LoginResponse): void => {
    this.cookieService.set(Constants.SESSION_TOKEN_NAME, res.token!)
    this.cookieService.set(Constants.REFRESH_SESSION_TOKEN_NAME, res.refreshToken!)
  }

  logout(): void {
    this.cookieService.delete(Constants.SESSION_TOKEN_NAME)
    this.cookieService.delete(Constants.REFRESH_SESSION_TOKEN_NAME)
    this.socialAuthService.signOut();
  }

  verifyUserIsAuthenticated(): boolean {
    return this.cookieService.check(Constants.REFRESH_SESSION_TOKEN_NAME)
  }
}
