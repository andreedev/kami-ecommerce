import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: AppRoutes.LOGIN_COMPONENT_NAME, component: LoginComponent },
      { path: AppRoutes.SIGN_UP_COMPONENT_NAME, component: SignUpComponent },
      { path: AppRoutes.RESET_PASSWORD_COMPONENT_NAME, component: ResetPasswordComponent, data: {email: 'some value'} },
      { path: "", pathMatch: "full", redirectTo: AppRoutes.LOGIN_COMPONENT_NAME }
    ]
  },
  { path: "", pathMatch: "full", redirectTo: "" },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
