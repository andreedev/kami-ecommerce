import { Component, HostListener, OnInit } from '@angular/core';
import { AppRoutes } from 'app/core/constants';

import { AuthService } from 'app/core/services/auth.service';
import { DataService } from 'app/core/services/data.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {
  readonly appRoutes: typeof AppRoutes = AppRoutes;

  constructor(
    public dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.dataService.screenWidth = event.target.innerWidth
  }
}
