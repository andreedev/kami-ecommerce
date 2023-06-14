import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { AuthService } from 'app/core/services';
import { AuthDataService } from 'app/core/services/data/auth-data.service';
import { DataService } from 'app/core/services/data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
  readonly appRoutes: typeof AppRoutes = AppRoutes;

  email: string = ''
  password: string = ''


  message: string = ''

  constructor(
    private authService: AuthService,
    private authDataService: AuthDataService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  login(): void {
    this.message = ''
    this.dataService.enableLoading()
    this.authService.login(this.email, this.password).then(res => {
      this.dataService.disableLoading()
      if (!res) {
        this.message = 'Correo o contraseña inválido'
        return
      }
      this.authDataService.updateSession(res)
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
    })
  }

}
