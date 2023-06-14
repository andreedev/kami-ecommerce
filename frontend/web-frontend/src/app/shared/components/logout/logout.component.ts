import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants/app-routes';
import { AuthService } from 'app/core/services/api/auth.service';
import { AuthDataService } from 'app/core/services/data/auth-data.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent {

  constructor(
    private authService: AuthService,
    private authDataService: AuthDataService,
    private router: Router
  ) { }

  logout(): void {
    // this.authService.logout()
    // this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME])
  }


}
