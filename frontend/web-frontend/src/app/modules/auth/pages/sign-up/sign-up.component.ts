import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
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

  //validation
  message: SafeHtml = '';
  messageClass: string = '';

  constructor(
    private authService: AuthService,
    public authDataService: AuthDataService,
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  async signUp(): Promise<void> {
    if (!this.validate()) return;
    this.dataService.enableLoading();
    const response: any = await this.authService.signUp(this.authDataService.customerSignUpRequest);
    if (response===1) {
      this.messageClass = 'text-green';
      this.message = 'Registro exitoso. Redireccionando...';
      this.resetCustomerSignUpRequest();
      setTimeout(() => {
        this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME]);
      }, 1000);
    } else if(response instanceof HttpErrorResponse) {
      this.messageClass = 'text-danger';
      const errorMessages = response.error.errorMessages;
      this.message = this.sanitizer.bypassSecurityTrustHtml(
        errorMessages.join('<br>')
      );
    }
    this.dataService.disableLoading();
  }

  private validate(): boolean {
    this.messageClass = 'text-danger';
    if (!Utils.validateIsEmail(this.authDataService.customerSignUpRequest.email!)) {
      this.message = 'La dirección de email no es válida';
      return false;
    }

    this.message = '';
    return true;
  }

  resetCustomerSignUpRequest(): void {
    this.authDataService.customerSignUpRequest = {
      documentType: 1,
      documentNumber: "",
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phoneNumber: ""
    };
  }

}

