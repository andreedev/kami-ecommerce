import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { AuthStatus } from 'app/core/enums/auth-status';
import { Utils } from 'app/core/helpers/utils';
import { AuthService, AuthDataService, DataService } from 'app/core/services';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit{
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  
  //validation
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
    this.authDataService.resendVerificationEmailEvent.subscribe((email: string)=>{
      this.dataService.enableLoading();
      this.resendVerificationEmail(email);
      setTimeout(() => {
        this.dataService.disableLoading();
      }, 1000);
    })
  }

  async verifyEmailCode(): Promise<void> {
    if (!this.validate()) return;
    this.dataService.enableLoading();
    const response: any = await this.authService.verifyEmailCode(this.emailVerificationCode);
    setTimeout(() => {
      if (response.code === 1) {
        this.messageClass = 'text-green';
        this.message = 'Tu correo ha sido verificado con éxito. Iniciando sesión...';
        this.authDataService.updateSession(response)
        this.authDataService.authStatus.next(AuthStatus.LOGGED_IN.getName())
        this.authDataService.loadProfile()
        setTimeout(() => {
          this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME]);
        }, 2000);
      } else if (response.code === -1) {
        this.messageClass = 'text-red';
        this.message = 'Código inválido o expirado.';
      } else if (response instanceof HttpErrorResponse) {
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
      }
      this.dataService.disableLoading();
    }, 2000);
  }

  private validate(): boolean {
    this.messageClass = 'text-red';

    if (Utils.stringIsEmpty(this.emailVerificationCode)) {
      this.message = 'Ingrese su correo';
      return false;
    }

    if (!Utils.stringHasNumber(this.emailVerificationCode)) {
    this.message = 'El código solo contiene números.';
    return false;
  }

    this.message = '';
    return true;
  }

  async resendVerificationEmail(email: string): Promise<void> {
    const response: any = await this.authService.resendVerificationEmail(email);
   if (response === -1) {
      this.messageClass = 'text-red';
      this.message = 'Error al enviar código de verificación';
    }
  }
  
}
