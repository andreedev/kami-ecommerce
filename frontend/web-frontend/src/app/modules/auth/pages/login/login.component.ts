import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { AuthStatus } from 'app/core/enums/auth-status';
import { Utils } from 'app/core/helpers/utils';
import { AuthService } from 'app/core/services';
import { AuthDataService } from 'app/core/services/data/auth-data.service';
import { DataService } from 'app/core/services/data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly constants: typeof Constants = Constants;

  email: string = ''
  password: string = ''

  //validate
  messageClass: string = '';
  message: string = ''
  step: number = 1

  emailAutofocus=true
  passwordAutofocus=false
  

  constructor(
    private authService: AuthService,
    private authDataService: AuthDataService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  checkEmail(): void {
    if (!this.validate()) return;
    this.message = ''
    this.dataService.enableLoading()
    this.authService.checkEmail(this.email).then(res => {
      this.dataService.disableLoading()
      if (res===1){
        this.step = 2;
        this.emailAutofocus=false
        this.passwordAutofocus=true
      } else { 
        this.authDataService.customerSignUpRequest.email = this.email
        this.router.navigate([AppRoutes.SIGN_UP_COMPONENT_ROUTE_NAME])
      }
    })
  }

  login(): void {
    this.message = ''
    this.dataService.enableLoading()
    this.authService.login(this.email, this.password).then(res => {
      this.dataService.disableLoading()
      if (!res) {
        this.message = 'Contraseña incorrecta'
        return
      }
      this.authDataService.updateSession(res)
      this.authDataService.authStatus.next(AuthStatus.LOGGED_IN.getName())
      this.authDataService.loadProfile()
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
    })
  }

  private validate(): boolean {
    this.messageClass = 'text-danger';
    if (!Utils.validateIsEmail(this.email)) {
      this.message = 'La dirección de email no es válida';
      return false;
    }

    this.message = '';
    return true;
  }

  reset():void{
    this.step=1;
    this.email=''
    this.password=''
  }

}
