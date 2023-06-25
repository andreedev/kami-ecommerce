import { Component, OnInit } from '@angular/core';
import { AppRoutes } from 'app/core/constants';
import { EmployeeService } from 'app/core/services';
import { DataService } from 'app/core/services/data/data.service';

@Component({
  selector: 'app-sidebar-main-layout',
  templateUrl: './sidebar-main-layout.component.html'
})
export class SidebarMainLayoutComponent implements OnInit {
  readonly appRoutes = AppRoutes;

  constructor(
    private employeeService: EmployeeService,
    public dataService: DataService
  ) { }

  async ngOnInit(): Promise<void> {
    this.dataService.loggedInEmployee = await this.employeeService.getEmployee()
  }

  public closeMobileMenu(): void {
    this.dataService.displayMobileMenu = false;
  }

}
