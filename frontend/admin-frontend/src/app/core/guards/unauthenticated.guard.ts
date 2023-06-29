import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { Observable } from 'rxjs';
import { AuthStatus } from '../enums/auth-status';
import { AuthDataService } from '../services/data/auth-data.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedGuard implements CanActivate {
  constructor(
    private authDataService: AuthDataService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //console.log('UnauthenticatedGuard')
    if (this.authDataService.authStatus.value === AuthStatus.LOGGED_IN.getName()) {
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
      return false
    }
    return true
  }

}
