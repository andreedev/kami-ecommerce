import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { AppRoutes } from 'app/core/constants';
import { AuthDataService } from '../services/data/auth-data.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    private authDataService: AuthDataService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //console.log('UnauthenticatedGuard')
    if (this.authDataService.verifyUserIsAuthenticated()) {
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
      return false
    }
    return true
  }

}
