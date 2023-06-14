import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CoreModule } from 'app/core/core.module';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    SignUpComponent
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
