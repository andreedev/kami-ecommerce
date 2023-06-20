import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { DataService, OrderService } from 'app/core/services';
import { CartDataService } from 'app/core/services/data/cart-data.service';
import { Renderer2 } from '@angular/core';


@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly constants: typeof Constants = Constants;

  step: number = 1

  generateOrderBtnIsActive: boolean = false
  deliveryMethod: string | undefined
  paymentMethod: string | undefined

  constructor(
    private orderService: OrderService,
    private dataService: DataService,
    public cartDataService: CartDataService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if (this.cartDataService.cart.products.length<1){
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
    }
    this.renderer.addClass(document.body, 'bg-light');
  }

  generateOrder():void{
    
  }
  
  recalculatePayment():void{

  }

  onChangeDeliveryMethod(event: any):void{
    console.log(event);
  }

  onChangePaymentMethod(event: any):void{
    console.log(event);
  }
  
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'bg-light');
  }
  

}
