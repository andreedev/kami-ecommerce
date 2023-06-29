import { Component, OnInit } from '@angular/core';
import { AppRoutes } from 'app/core/constants';
import { AuthStatus } from 'app/core/enums/auth-status';
import { EmployeeService } from 'app/core/services';
import { AuthDataService } from 'app/core/services/data/auth-data.service';
import { DataService } from 'app/core/services/data/data.service';

@Component({
  selector: 'app-sidebar-main-layout',
  templateUrl: './sidebar-main-layout.component.html'
})
export class SidebarMainLayoutComponent {
  readonly AuthStatus = AuthStatus;
  readonly appRoutes = AppRoutes;

  constructor(
    public authDataService: AuthDataService,
    public dataService: DataService
  ) { }

  public closeMobileMenu(): void {
    this.dataService.displayMobileMenu = false;
  }

}
