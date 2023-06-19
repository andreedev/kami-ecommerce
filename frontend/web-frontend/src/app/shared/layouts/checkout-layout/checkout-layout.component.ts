import { Component, HostListener, OnInit } from '@angular/core';

import { DataService } from 'app/core/services/data/data.service';

@Component({
  selector: 'checkout-layout',
  templateUrl: './checkout-layout.component.html'
})
export class CheckoutLayoutComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   this.dataService.screenWidth = event.target.innerWidth
  // }

}
