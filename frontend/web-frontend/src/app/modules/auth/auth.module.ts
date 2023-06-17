import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CoreModule } from 'app/core/core.module';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { LinkToGoogleAccountComponent } from './pages/link-to-google-account/link-to-google-account.component';

@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    SignUpComponent,
    VerifyEmailComponent,
    LinkToGoogleAccountComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    AuthRoutingModule,
    SocialLoginModule//this must be imported as close as possible to login component
  ],
  providers: [//this fix an error: SocialLoginModule is already loaded. Import it in the AppModule only
    {
        provide: SocialLoginModule,
        useValue: new SocialLoginModule(null!),
    },
  ]
})
export class AuthModule { }
