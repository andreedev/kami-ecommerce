import { Component, Inject, OnInit } from '@angular/core';
import { AppRoutes } from 'app/core/constants';
import { Employee } from 'app/core/models';
import { AuthService } from 'app/core/services';
import { LoginResponse } from '../../../../core/models/login-response';
import { DataService } from '../../../../core/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;

  username: string = ''
  password: string = ''
  message: string = ''

  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(DataService) private dataService: DataService,
    @Inject(Router) private router: Router
  ) { }

  login(): void {
    this.message = ''
    this.dataService.enableLoading()
    this.authService.login(this.username, this.password).then(res => {
      this.dataService.disableLoading()
      if (!res) {
        this.message = 'Invalid credentials'
        return
      }
      this.authService.updateSession(res)
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
    }
    )
  }

}
