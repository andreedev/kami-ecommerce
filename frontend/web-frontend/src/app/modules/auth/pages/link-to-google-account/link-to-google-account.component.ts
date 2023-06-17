import { Component, OnInit } from '@angular/core';
import { AppRoutes } from 'app/core/constants';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService, AuthDataService, DataService } from 'app/core/services';
import { Utils } from '../../../../core/helpers/utils';

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

  linkGoogleAccount():void{
    
  }

  cancel(): void {
    this.authDataService.linkToGoogleAccountRequest.email = ''
    this.authDataService.linkToGoogleAccountRequest.password = ''
    this.authDataService.linkToGoogleAccountRequest.idToken = ''
    this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME])
  }

}
