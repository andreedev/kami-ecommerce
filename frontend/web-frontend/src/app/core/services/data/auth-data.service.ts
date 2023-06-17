import { EventEmitter, Injectable } from '@angular/core';
import { Constants } from 'app/core/constants';
import { AuthStatus } from 'app/core/enums/auth-status';
import { Customer, SessionResponse } from 'app/core/models';
import { CustomerService } from 'app/core/services/api/customer.service';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../api/auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  loggedInCustomer: Customer | undefined;
  authStatus: BehaviorSubject<string> = new BehaviorSubject<string>(AuthStatus.NONE.getName());

  customerSignUpRequest: Customer = {
    documentType: 1,
    documentNumber: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    isLinkedToGoogleAccount: false,
    googleIdToken: ""
  };

  linkToGoogleAccountRequest: any = {
    email: '',
    password: '',
    googleIdToken: ''
  }

  resendVerificationEmailEvent: EventEmitter<any> = new EventEmitter();
  authenticateWithGoogleEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private cookieService: CookieService,
    private customerService: CustomerService,
    private authService: AuthService,
    public socialAuthService: SocialAuthService
  ) {
    this.checkAuthStatus();
    this.initializeGoogleAuthResolver();
  }

  initializeGoogleAuthResolver(): void {
    const observer = this.socialAuthService.authState.subscribe((user: any) => {
      this.authenticateWithGoogleEvent.emit(user)
      // observer.unsubscribe()
    });
  }

  async checkAuthStatus(): Promise<void> {
    if (this.cookieService.check(Constants.REFRESH_SESSION_TOKEN_NAME)) {
      const response: boolean = await this.authService.refreshToken();
      if (response) {
        this.authStatus.next(AuthStatus.LOGGED_IN.getName());
        this.loadProfile()
      }
    }
  }

  updateSession(res: SessionResponse): void {
    this.cookieService.set(Constants.SESSION_TOKEN_NAME, res.data.token!)
    this.cookieService.set(Constants.REFRESH_SESSION_TOKEN_NAME, res.data.refreshToken!)
  }

  logout(): void {
    this.cookieService.delete(Constants.SESSION_TOKEN_NAME)
    this.cookieService.delete(Constants.REFRESH_SESSION_TOKEN_NAME)
    this.authStatus.next(AuthStatus.NONE.getName());
  }

  async loadProfile(): Promise<void> {
    const customer: Customer | null = await this.customerService.getProfile();
    if (!customer) return;
    this.loggedInCustomer = customer;
  }



}
