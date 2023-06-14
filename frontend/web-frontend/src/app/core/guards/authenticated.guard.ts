import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutes } from '../constants/app-routes';
import { AuthService } from '../services/api/auth.service';
import { AuthDataService } from '../services/data/auth-data.service';
import { AuthStatus } from '../enums/auth-status';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private authDataService: AuthDataService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authDataService.authStatus.value === AuthStatus.NONE.getName()) {
      this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME])
      return false
    }
    return true
  }


}
