import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { AuthStatus } from 'app/core/enums/auth-status';
import { AuthService, DataService, EmployeeService } from 'app/core/services';
import { AuthDataService } from 'app/core/services/data/auth-data.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;

  username: string = ''
  password: string = ''
  message: string = ''
  messageClass: string = ''

  constructor(
    private authService: AuthService,
    private authDataService: AuthDataService,
    private dataService: DataService,
    private router: Router
  ) { }

  async login(): Promise<void> {
    this.message = ''
    this.dataService.enableLoading()
    const response: any = await this.authService.login(this.username, this.password);
    if (response instanceof HttpErrorResponse) {
      if (response.error.code === -1 && response.status === 401) {
        this.messageClass = 'text-red';
        this.message = 'Invalid credentials';
      } else {
        this.messageClass = 'text-red';
        this.message = 'Internal error';
      }
    } else if (response.code === 1) {
      this.authDataService.updateSession(response);
      this.authDataService.authStatus.next(AuthStatus.LOGGED_IN.getName());
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME]);
    }
    this.dataService.disableLoading()
  }

}
