import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/api/auth.service';
import { Observable } from 'rxjs';
import { AppRoutes } from 'app/core/constants';
import { AuthDataService } from '../services/data/auth-data.service';
import { AuthStatus } from '../enums/auth-status';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedGuard implements CanActivate {
  constructor(
    private authDataService: AuthDataService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authDataService.authStatus.value === AuthStatus.LOGGED_IN.getName()) {
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
      return false
    }
    return true
  }

}
