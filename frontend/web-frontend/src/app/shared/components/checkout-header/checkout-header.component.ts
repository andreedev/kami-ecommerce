import { Component } from '@angular/core';
import { AppRoutes } from 'app/core/constants';
import { Location } from '@angular/common';

@Component({
  selector: 'checkout-header',
  templateUrl: './checkout-header.component.html',
  styles: [
  ]
})
export class CheckoutHeaderComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;

  constructor(
    private location: Location
  ) { }

  goBack():void{
    this.location.back();
  }
}
