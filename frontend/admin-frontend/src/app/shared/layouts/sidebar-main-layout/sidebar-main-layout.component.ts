import { Component, Inject, OnInit } from '@angular/core';
import { AppRoutes } from 'app/core/constants';
import { DataService } from 'app/core/services/data.service';
import { EmployeeService } from 'app/core/services/employee.service';

@Component({
  selector: 'app-sidebar-main-layout',
  templateUrl: './sidebar-main-layout.component.html'
})
export class SidebarMainLayoutComponent implements OnInit {
  readonly appRoutes = AppRoutes;

  constructor(
    @Inject(EmployeeService) private employeeService: EmployeeService,
    @Inject(DataService) public dataService: DataService
  ) {}

  async ngOnInit(): Promise<void> {
    this.dataService.loggedInEmployee = await this.employeeService.getEmployee()
  }

  public closeMobileMenu(): void {
    this.dataService.displayMobileMenu = false;
  }

}
