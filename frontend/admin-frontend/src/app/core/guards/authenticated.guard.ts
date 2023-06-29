import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutes } from '../constants/app-routes';
import { AuthStatus } from '../enums/auth-status';
import { AuthDataService } from '../services/data/auth-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private authDataService: AuthDataService,
    private router: Router
  ) { }

  // @ts-ignore
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree> {
    if (this.authDataService.authStatus.value === AuthStatus.LOADING.getName()) {
      await this.waitForAuthStatusChange();
    }
    if (this.authDataService.authStatus.value === AuthStatus.NONE.getName()) {
      this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME])
      return false
    }
    return true
  }

  private waitForAuthStatusChange(): Promise<void> {
    return new Promise<void>((resolve) => {
      const subscription = this.authDataService.authStatus.subscribe((status) => {
        if (status !== AuthStatus.LOADING.getName()) {
          subscription.unsubscribe();
          resolve();
        }
      });
    });
  }


}
