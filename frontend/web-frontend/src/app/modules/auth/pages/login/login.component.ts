import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { AuthStatus } from 'app/core/enums/auth-status';
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

  message: string = ''
  step: number = 1

  constructor(
    private authService: AuthService,
    private authDataService: AuthDataService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  checkEmail(): void {
    this.message = ''
    this.dataService.enableLoading()
    this.authService.checkEmail(this.email).then(res => {
      this.dataService.disableLoading()
      if (res===1){
        this.step = 2;
      } else {
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
        this.message = 'Error: Contraseña incorrecta'
        return
      }
      this.authDataService.updateSession(res)
      this.authDataService.authStatus.next(AuthStatus.LOGGED_IN.getName())
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
    })
  }

  reset():void{
    this.step=1;
    this.email=''
    this.password=''
  }

}
