import { Component, HostListener, OnInit } from '@angular/core';
import { CartDataService, SearchDataService } from 'app/core/services';

import { DataService } from 'app/core/services/data/data.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private cartDataService: CartDataService,
    private searchDataService: SearchDataService,
  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.dataService.screenWidth = event.target.innerWidth
  }

  debug(): void {
    console.log(this.dataService);
    console.log(this.cartDataService);
    console.log(this.searchDataService);
  }
}
