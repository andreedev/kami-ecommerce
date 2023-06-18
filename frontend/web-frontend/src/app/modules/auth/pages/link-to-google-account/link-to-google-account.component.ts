import { Component, OnInit } from '@angular/core';
import { AppRoutes } from 'app/core/constants';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService, AuthDataService, DataService } from 'app/core/services';
import { Utils } from '../../../../core/helpers/utils';
import { AuthStatus } from 'app/core/enums/auth-status';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-link-to-google-account',
  templateUrl: './link-to-google-account.component.html',
  styles: [
  ]
})
export class LinkToGoogleAccountComponent implements OnInit {
  readonly appRoutes: typeof AppRoutes = AppRoutes;

  message: SafeHtml = '';
  messageClass: string = '';

  passwordAutofocus = true

  constructor(
    private authService: AuthService, 
    public authDataService: AuthDataService,
    private dataService: DataService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (
      Utils.stringIsEmpty(this.authDataService.linkToGoogleAccountRequest.email) ||
      Utils.stringIsEmpty(this.authDataService.linkToGoogleAccountRequest.idToken))
    {
      this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME])
    }
  }

  async linkGoogleAccount():Promise<void>{
    if (!this.validatePassword()) return;
    this.message = ''
    this.dataService.enableLoading();
    const response: any = await this.authService.linkToGoogleAccount(
      this.authDataService.linkToGoogleAccountRequest.email,
      this.authDataService.linkToGoogleAccountRequest.password,
      this.authDataService.linkToGoogleAccountRequest.idToken
    );
    if (response instanceof HttpErrorResponse) {
      if (response.error.code === -1 && response.status === 401) {
        this.messageClass = 'text-red';
        this.message = response.error.message;
      } else {
        this.messageClass = 'text-red';
        this.message = 'Internal error'
      }
    } else if (response.code === 1) {
      this.messageClass = 'text-green';
      this.message = response.message
      setTimeout(() => {
        this.authDataService.updateSession(response)
        this.authDataService.authStatus.next(AuthStatus.LOGGED_IN.getName())
        this.authDataService.loadProfile()
        this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
      }, 2000);
    } else if (response.code === -2) {
      this.messageClass = 'text-red';
      this.message = response.message
    } else if (response.code === 350 || response.code === 360) {
      this.messageClass = 'text-red';
      this.message = 'Invalid google session'
    }
    this.dataService.disableLoading();
  }


  private validatePassword(): boolean {
    this.messageClass = 'text-red';

    if (Utils.stringIsEmpty(this.authDataService.linkToGoogleAccountRequest.password)) {
      this.message = 'Ingrese una contraseña';
      return false;
    }

    this.message = '';
    return true;
  }

  cancel(): void {
    this.authDataService.linkToGoogleAccountRequest.email = ''
    this.authDataService.linkToGoogleAccountRequest.password = ''
    this.authDataService.linkToGoogleAccountRequest.idToken = ''
    this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME])
  }

}
