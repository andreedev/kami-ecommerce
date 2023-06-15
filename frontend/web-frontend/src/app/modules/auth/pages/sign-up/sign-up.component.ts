import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentInit, Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { AuthService, DataService } from 'app/core/services';
import { AuthDataService } from 'app/core/services/data/auth-data.service';
import { DocumentType } from 'app/core/enums/document-type';
import { VerifyEmailCodeResponse } from 'app/core/models/rest/verify-email-code-response';
import { AuthStatus } from 'app/core/enums/auth-status';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: [
  ]
})
export class SignUpComponent implements OnInit {
  readonly appRoutes: typeof AppRoutes = AppRoutes;

  //validation
  message: SafeHtml = '';
  messageClass: string = '';

  isEmailPrefilled: boolean = false;
  step: number = 1

  emailVerificationCode: string = ''

  constructor(
    private authService: AuthService,
    public authDataService: AuthDataService,
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!Utils.stringIsEmpty(this.authDataService.customerSignUpRequest.email!)) {
      this.isEmailPrefilled = true
    }
  }

  async signUp(): Promise<void> {
    if (!this.validateCustomerSignUpRequest()) return;
    this.dataService.enableLoading();
    const response: any = await this.authService.signUp(this.authDataService.customerSignUpRequest);
    if (response === 1) {
      this.step= 2;
    } else if (response instanceof HttpErrorResponse) {
      console.log('http error response')
      this.messageClass = 'text-danger';
      const errorMessages = response.error.errorMessages;
      this.message = this.sanitizer.bypassSecurityTrustHtml(
        errorMessages.join('<br>')
      );
    }
    this.dataService.disableLoading();
  }

  async verifyEmailCode(): Promise<void> {
    if (!this.validateEmailVerificationCode()) return;
    this.dataService.enableLoading();
    const response: any= await this.authService.verifyEmailCode(this.emailVerificationCode);
    if (response.code === 1) {
      this.messageClass = 'text-green';
      this.message = 'Tu correo ha sido verificado con éxito. Iniciando sesión...';
      this.resetCustomerSignUpRequest();
      this.authDataService.updateSession(response.data)
      this.authDataService.authStatus.next(AuthStatus.LOGGED_IN.getName())
      this.authDataService.loadProfile()
      setTimeout(() => {
        this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME]);
      }, 1200);
    } else if (response.code === -1) {
      this.messageClass = 'text-red';
      this.message = 'Código inválido o expirado.';
    } else if (response instanceof HttpErrorResponse) {
      this.messageClass = 'text-danger';
      const errorMessages = response.error.errorMessages;
      this.message = this.sanitizer.bypassSecurityTrustHtml(
        errorMessages.join('<br>')
      );
    }
    this.dataService.disableLoading();
  }

  private validateCustomerSignUpRequest(): boolean {
    this.messageClass = 'text-danger';

    if (this.authDataService.customerSignUpRequest.documentType == DocumentType.DNI.getCode()) {
      if (
        !Utils.stringHasNumber(this.authDataService.customerSignUpRequest.documentNumber!) ||
        !Utils.stringHasLength(this.authDataService.customerSignUpRequest.documentNumber!, DocumentType.DNI.getMinLength())
      ) {
        this.message = 'DNI inválido';
        return false;
      }

    } else if (this.authDataService.customerSignUpRequest.documentType == DocumentType.RUC.getCode()) {
      if (
        !Utils.stringHasNumber(this.authDataService.customerSignUpRequest.documentNumber!) ||
        !Utils.stringHasLength(this.authDataService.customerSignUpRequest.documentNumber!, DocumentType.RUC.getMinLength())
      ) {
        this.message = 'RUC inválido';
        return false;
      }

    } else if (this.authDataService.customerSignUpRequest.documentType == DocumentType.CE.getCode()) {
      if (
        Utils.stringHasLessLengthThan(this.authDataService.customerSignUpRequest.documentNumber!, DocumentType.CE.getMinLength())
      ) {
        this.message = 'Carnet extranjería inválido';
        return false;
      }

    } else if (this.authDataService.customerSignUpRequest.documentType == DocumentType.PS.getCode()) {
      if (
        Utils.stringHasLessLengthThan(this.authDataService.customerSignUpRequest.documentNumber!, DocumentType.PS.getMinLength())
      ) {
        this.message = 'Pasaporte inválido';
        return false;
      }
    }

    if (Utils.stringIsEmpty(this.authDataService.customerSignUpRequest.name!)) {
      this.message = 'Ingrese nombre(s)';
      return false;
    } else if (Utils.stringHasNumber(this.authDataService.customerSignUpRequest.name!)) {
      this.message = 'Nombre(s) debe contener solo letras.';
      return false;
    }

    if (Utils.stringIsEmpty(this.authDataService.customerSignUpRequest.lastName!)) {
      this.message = 'Ingrese apellido(s)';
      return false;
    } else if (Utils.stringHasNumber(this.authDataService.customerSignUpRequest.lastName!)) {
      this.message = 'Apellido(s) debe contener solo letras.';
      return false;
    }

    if (!Utils.validateIsEmail(this.authDataService.customerSignUpRequest.email!)) {
      this.message = 'La dirección de email no es válida';
      return false;
    }

    if (Utils.stringIsEmpty(this.authDataService.customerSignUpRequest.password!)) {
      this.message = 'Ingrese una contraseña';
      return false;
    } else if (this.authDataService.customerSignUpRequest.password!.length < 8) {
      this.message = 'La contraseña debe tener al menos 8 caracteres';
      return false;
    }

    if (this.authDataService.customerSignUpRequest.password !== this.authDataService.customerSignUpRequest.passwordConfirm) {
      this.message = 'Las contraseñas no coinciden';
      return false;
    }

    if (
      !Utils.stringHasNumber(this.authDataService.customerSignUpRequest.phoneNumber!) ||
      !Utils.stringHasMoreLengthThan(this.authDataService.customerSignUpRequest.phoneNumber!, 8)
    ) {
      this.message = 'Celular invalido';
      return false;
    }

    this.message = '';
    return true;
  }

  private validateEmailVerificationCode(): boolean {
    this.messageClass = 'text-danger';

    if (
      !Utils.stringHasNumber(this.authDataService.customerSignUpRequest.phoneNumber!)
    ) {
      this.message = 'El código solo contiene números.';
      return false;
    }

    this.message = '';
    return true;
  }

  resetSignUp(): void {
    this.resetCustomerSignUpRequest()
    this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME])
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

