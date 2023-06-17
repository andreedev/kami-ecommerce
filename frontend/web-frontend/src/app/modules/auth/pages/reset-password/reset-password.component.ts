import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { AuthService, AuthDataService, DataService } from 'app/core/services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;

  //validation
  message: SafeHtml = '';
  messageClass: string = '';

  isEmailPrefilled: boolean = false;
  step: number = 1

  email: string = '';
  code: string = '';
  newPassword: string = '';
  newPasswordConfirm: string = '';

  emailFocus = true
  codeFocus = false

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  async resetPassword(): Promise<void> {
    if (!this.validateEmail()) return;
    this.dataService.enableLoading();
    const response: any = await this.authService.resetPassword(this.email);
    if (response === true) {
      this.step = 2;
      this.emailFocus = false
      this.codeFocus = true
    } else if (response === false) {
      this.messageClass = 'text-red';
      this.message = 'Correo no se encuentra registrado.';
    } else if (response instanceof HttpErrorResponse) {
      if (response.error){
        const errorMessages = response.error.errorMessages;
        if (errorMessages){
          this.message = this.sanitizer.bypassSecurityTrustHtml(
            errorMessages.join('<br>')
          );
        }
      }
    }
    this.dataService.disableLoading();
  }

  async verifyResetPassword(): Promise<void> {
    if (!this.validateResetPasswordRequest()) return;
    this.dataService.enableLoading();
    const response: any = await this.authService.verifyResetPassword(this.code, this.newPassword);
    if (response === true) {
      this.messageClass = 'text-green';
      this.message = 'Tu contraseña se ha reestablecido. Redireccionado...';
      setTimeout(() => {
        this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME]);
      }, 1500);
    } else if (response === false) {
      this.messageClass = 'text-red';
      this.message = 'Código inválido o expirado.';
    } else if (response instanceof HttpErrorResponse) {
      if (response.error){
        const errorMessages = response.error.errorMessages;
        if (errorMessages){
          this.message = this.sanitizer.bypassSecurityTrustHtml(
            errorMessages.join('<br>')
          );
        }
      }
    }
    this.dataService.disableLoading();
  }

  private validateEmail(): boolean {
    this.messageClass = 'text-red';

    if (!Utils.validateIsEmail(this.email)) {
      this.message = 'La dirección de email no es válida';
      return false;
    }

    this.message = '';
    return true;
  }

  private validateResetPasswordRequest(): boolean {
    this.messageClass = 'text-red';

    if (
      !Utils.stringHasNumber(this.code)
    ) {
      this.message = 'El código debe contener solo números.';
      return false;
    }

    if (Utils.stringIsEmpty(this.newPassword)) {
      this.message = 'Ingrese una contraseña';
      return false;
    } else if (this.newPassword!.length < 8) {
      this.message = 'La contraseña debe tener al menos 8 caracteres';
      return false;
    }

    if (this.newPassword !== this.newPasswordConfirm) {
      this.message = 'Las contraseñas no coinciden';
      return false;
    }

    this.message = '';
    return true;
  }


}
