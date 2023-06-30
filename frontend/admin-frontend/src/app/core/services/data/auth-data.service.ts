import { Injectable } from '@angular/core';
import { Constants } from 'app/core/constants';
import { AuthStatus } from 'app/core/enums/auth-status';
import { Employee } from 'app/core/models';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { AuthService, EmployeeService } from '..';
import { SessionResponse } from 'app/core/models/rest/session-response';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  loggedInEmployee: Employee | undefined;
  authStatus: BehaviorSubject<string> = new BehaviorSubject<string>(AuthStatus.LOADING.getName());

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private employeeService: EmployeeService
    ) {
    this.authStatus.subscribe((value:any)=>{
      if (value===AuthStatus.LOGGED_IN.getName()){
        this.loadEmployee();
      }
    });
    this.checkAuthStatus();
  }

  async checkAuthStatus(): Promise<void> {
    if (this.cookieService.check(Constants.REFRESH_SESSION_TOKEN_NAME)) {
      const response: boolean = await this.authService.refreshToken();
      if (response) {
        this.authStatus.next(AuthStatus.LOGGED_IN.getName());
        return;
      }
    }
    this.authStatus.next(AuthStatus.NONE.getName())
  }

  updateSession(res: SessionResponse): void {
    this.cookieService.set(Constants.SESSION_TOKEN_NAME, res.data.token!)
    this.cookieService.set(Constants.REFRESH_SESSION_TOKEN_NAME, res.data.refreshToken!)
  }

  logout(): void {
    this.cookieService.delete(Constants.SESSION_TOKEN_NAME)
    this.cookieService.delete(Constants.REFRESH_SESSION_TOKEN_NAME)
    this.authStatus.next(AuthStatus.NONE.getName());
  }

  async loadEmployee(): Promise<void> {
    const response: Employee | null = await this.employeeService.getEmployee();
    if (!response) return;
    this.loggedInEmployee = response;
  }

  verifyUserIsAuthenticated(): boolean {
    return this.cookieService.check(Constants.REFRESH_SESSION_TOKEN_NAME)
  }


}
