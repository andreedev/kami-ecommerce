import { Component, HostListener, OnInit } from '@angular/core';
import { CartDataService, SearchDataService } from 'app/core/services';
import { CategoryDataService } from 'app/core/services/data/category-data.service';

import { DataService } from 'app/core/services/data/data.service';
import { ProductModalDataService } from 'app/core/services/data/product-modal-data.service';
import { AuthDataService } from '../../../core/services/data/auth-data.service';
import { CookieService } from 'ngx-cookie-service';
import { Constants } from 'app/core/constants';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.dataService.screenWidth = event.target.innerWidth
  }

}
