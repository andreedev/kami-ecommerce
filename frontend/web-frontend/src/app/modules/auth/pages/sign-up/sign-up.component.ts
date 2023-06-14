import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { Customer } from 'app/core/models';
import { AuthService, DataService } from 'app/core/services';
import { AuthDataService } from 'app/core/services/data/auth-data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: [
  ]
})
export class SignUpComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;

  customer: Customer = {
    documentType: 1,
    documentNumber: "",
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: ""
  };

  message: string = ''

  constructor(
    private authService: AuthService,
    private authDataService: AuthDataService,
    private dataService: DataService,
    private router: Router
  ) { }

  signUp(): void {
    this.message = ''
    this.dataService.enableLoading()
    this.authService.login(this.customer.email!, this.customer.password!).then(res => {
      this.dataService.disableLoading()
      if (!res) {
        this.message = 'Correo o contraseña inválido'
        return
      }
      this.authDataService.updateSession(res)
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
    }
    )
  }
}
