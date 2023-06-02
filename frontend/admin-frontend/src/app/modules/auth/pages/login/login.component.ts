import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { AuthService, DataService } from 'app/core/services';

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
