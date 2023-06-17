import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { AuthStatus } from 'app/core/enums/auth-status';
import { Utils } from 'app/core/helpers/utils';
import { SessionResponse } from 'app/core/models';
import { AuthService } from 'app/core/services';
import { AuthDataService } from 'app/core/services/data/auth-data.service';
import { DataService } from 'app/core/services/data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly constants: typeof Constants = Constants;

  email: string = ''
  password: string = ''

  message: SafeHtml = '';
  messageClass: string = '';

  step: number = 1

  emailAutofocus = true
  passwordAutofocus = false

  constructor(
    private authService: AuthService,
    private authDataService: AuthDataService,
    private dataService: DataService,
    private router: Router,
    private sanitizer: DomSanitizer,
    public socialAuthService: SocialAuthService,
  ) {
    this.initializeGoogleAuthResolver()
  }

  initializeGoogleAuthResolver(): void {
    this.socialAuthService.authState.subscribe(async (user: any) => {
      console.log(user)
      if (user === null) return;
      const idToken = user.idToken
      const googleEmail = user.email
      const response: SessionResponse = await this.authService.authenticateWithGoogle(googleEmail, idToken);
      console.log(response);
      if (response instanceof HttpErrorResponse) {
        this.messageClass = 'text-red';
          this.message = 'Internal error'
        return
      }
      if (response.code === -1) {
        this.authDataService.customerSignUpRequest.email = googleEmail
        this.authDataService.customerSignUpRequest.name = user.firstName
        this.authDataService.customerSignUpRequest.lastName = user.lastName
        this.authDataService.customerSignUpRequest.isLinkedToGoogleAccount = true
        this.authDataService.customerSignUpRequest.googleIdToken = idToken
        this.router.navigate([AppRoutes.SIGN_UP_COMPONENT_ROUTE_NAME])
        return
      }
      if (response.code === -2) {
        this.authDataService.linkToGoogleAccountRequest.email = googleEmail
        this.authDataService.linkToGoogleAccountRequest.idToken = idToken
        this.router.navigate([AppRoutes.LINK_TO_GOOGLE_ACCOUNT_COMPONENT_ROUTE_NAME]);
        return
      }
      if (response.code === 1) {
        this.authDataService.updateSession(response)
        this.authDataService.authStatus.next(AuthStatus.LOGGED_IN.getName())
        this.authDataService.loadProfile()
        this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
        return
      }
      if (response.code === 350 ||response.code === 360) {
        this.messageClass = 'text-red';
        this.message = 'Invalid google session'
        return
      }
    });
  }

  async checkEmail(): Promise<void> {
    if (!this.validateEmail()) return;
    this.message = ''
    this.dataService.enableLoading()
    const response: any = await this.authService.checkEmail(this.email);
    if (response instanceof HttpErrorResponse) {
      this.messageClass = 'text-red';
      this.message = 'Internal error'
    } else if (response.code===1) {
      this.step = 2;
      this.emailAutofocus = false
      this.passwordAutofocus = true
    } else if (response.code===-1){
      this.authDataService.customerSignUpRequest.email = this.email
      this.router.navigate([AppRoutes.SIGN_UP_COMPONENT_ROUTE_NAME])
    } else if (response.code===-2){
      this.messageClass = 'text-primary';
      this.message = response.message
      setTimeout(() => {
        this.authDataService.resendVerificationEmailEvent.emit(this.email);
        this.router.navigate([AppRoutes.VERIFY_EMAIL_COMPONENT_ROUTE_NAME])
      }, 2500);
    } else if (response.code===-3){
      this.messageClass = 'text-red';
      this.message = response.message
    } else if (response.code===-4){
      this.messageClass = 'text-red';
      this.message = response.message
    }
    this.dataService.disableLoading()
  }

  async login(): Promise<void> {
    if (!this.validatePassword()) return;
    this.message = ''
    this.dataService.enableLoading();
    const response: any = await this.authService.login(this.email, this.password);
    if (response instanceof HttpErrorResponse) {
      if (response.error.code===-1 && response.status ===401){
        this.messageClass = 'text-red';
        this.message = response.error.message;
      } else {
        this.messageClass = 'text-red';
        this.message = 'Internal error'
      }
    } else if (response.code === 1) {
      this.authDataService.updateSession(response)
      this.authDataService.authStatus.next(AuthStatus.LOGGED_IN.getName())
      this.authDataService.loadProfile()
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
    } else if (response.code===-2){
      this.messageClass = 'text-red';
      this.message = response.message
      setTimeout(() => {
        this.authDataService.resendVerificationEmailEvent.emit(this.email);
        this.router.navigate([AppRoutes.VERIFY_EMAIL_COMPONENT_ROUTE_NAME])
      }, 2500);
    } else {
      this.messageClass = 'text-red';
      this.message = response.message
    }
    this.dataService.disableLoading();
  }

  private validateEmail(): boolean {
    this.messageClass = 'text-red';

    if (Utils.stringIsEmpty(this.email)) {
      this.message = 'Ingrese su correo';
      return false;
    }

    if (!Utils.validateIsEmail(this.email)) {
      this.message = 'La dirección de email no es válida';
      return false;
    }

    this.message = '';
    return true;
  }

  private validatePassword(): boolean {
    this.messageClass = 'text-red';

    if (Utils.stringIsEmpty(this.password)) {
      this.message = 'Ingrese una contraseña';
      return false;
    }

    this.message = '';
    return true;
  }

  reset(): void {
    this.step = 1;
    this.email = ''
    this.password = ''
    this.emailAutofocus = true
    this.passwordAutofocus = false
  }

}
