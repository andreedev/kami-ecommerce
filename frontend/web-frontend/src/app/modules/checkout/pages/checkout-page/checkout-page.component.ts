import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { DataService, OrderService } from 'app/core/services';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly constants: typeof Constants = Constants;

  step: number = 1

  constructor(
    private orderService: OrderService,
    private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    
  }

}
