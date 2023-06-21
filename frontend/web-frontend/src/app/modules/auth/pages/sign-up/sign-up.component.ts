import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { DocumentType } from 'app/core/enums/document-type';
import { Utils } from 'app/core/helpers/utils';
import { AuthService, DataService } from 'app/core/services';
import { AuthDataService } from 'app/core/services/data/auth-data.service';
import { AuthStatus } from 'app/core/enums/auth-status';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: [
  ]
})
export class SignUpComponent implements OnInit {
  readonly appRoutes: typeof AppRoutes = AppRoutes;

  message: SafeHtml = '';
  messageClass: string = '';

  isEmailPrefilled: boolean = false;

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
    if (this.authDataService.customerSignUpRequest.isLinkedToGoogleAccount)
      this.signUpWithGoogle()
    else 
      this.signUpWithEmail()
  }

  async signUpWithEmail(): Promise<void> {
    if (!this.validateCustomerSignUpRequest()) return;
    this.dataService.enableLoading();
    const response: any = await this.authService.signUp(this.authDataService.customerSignUpRequest);
    if (response instanceof HttpErrorResponse) {
      this.messageClass = 'text-red';
      this.message = 'Internal error'
      if (response.error && response.error.errorMessages){
        const errorMessages = response.error.errorMessages;
        if (errorMessages){
          this.message = this.sanitizer.bypassSecurityTrustHtml(
            errorMessages.join('<br>')
          );
        }
      }
    } else if (response === 1) {
      this.router.navigate([AppRoutes.VERIFY_EMAIL_COMPONENT_ROUTE_NAME])
    }
    this.dataService.disableLoading();
  }

  async signUpWithGoogle(): Promise<void> {
    if (!this.validateCustomerSignUpRequest()) return;
    this.dataService.enableLoading();
    const response: any = await this.authService.signUpWithGoogle(this.authDataService.customerSignUpRequest);
    if (response instanceof HttpErrorResponse) {
      this.messageClass = 'text-red';
      this.message = 'Internal error'
      if (response.error && response.error.errorMessages){
        const errorMessages = response.error.errorMessages;
        if (errorMessages){
          this.message = this.sanitizer.bypassSecurityTrustHtml(
            errorMessages.join('<br>')
          );
        }
      }
    } else if (response.code === 1) {
      this.authDataService.updateSession(response)
      this.authDataService.authStatus.next(AuthStatus.LOGGED_IN.getName())
      this.authDataService.loadProfile()
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
    }
    this.dataService.disableLoading();
  }

  private validateCustomerSignUpRequest(): boolean {
    this.messageClass = 'text-red';

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

    if (!this.authDataService.customerSignUpRequest.isLinkedToGoogleAccount){
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
    }

    if (
      !Utils.stringHasNumber(this.authDataService.customerSignUpRequest.phoneNumber!) ||
      !Utils.stringHasMoreLengthThan(this.authDataService.customerSignUpRequest.phoneNumber!, 8)
    ) {
      this.message = 'El celular debe tener como mínimo 9 digitos';
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
      phoneNumber: "",
      addresses: []
    };
  }

}

