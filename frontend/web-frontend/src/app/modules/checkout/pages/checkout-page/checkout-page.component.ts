import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { AuthDataService, DataService, OrderService } from 'app/core/services';
import { CartDataService } from 'app/core/services/data/cart-data.service';
import { Renderer2 } from '@angular/core';
import { Order } from 'app/core/models';
import { Utils } from 'app/core/helpers/utils';


@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly constants: typeof Constants = Constants;

  message: SafeHtml = '';
  messageClass: string = 'text-red';

  generateOrderBtnIsActive: boolean = false

  order: Order = {
    delivery : {
      deliveryMethod: 'delivery',
      date: '2023-06-01',
      shippingAddress: {
        id: '',
        line: '-',
        reference: '-'
      }
    },
    payment : {
      paymentMethod: 'bank_transfer'
    },
    subTotal: undefined,
    deliveryCost: undefined,
    total: undefined
  }

  displayAddressesModal: boolean = false;

  constructor(
    private orderService: OrderService,
    private dataService: DataService,
    public cartDataService: CartDataService,
    public authDataService: AuthDataService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if (this.cartDataService.cart.products.length<1){
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
    }
    this.renderer.addClass(document.body, 'bg-light');
    this.authDataService.profileLoadedEvent.subscribe((value)=>{
      
    })
  }

  generateOrder():void{
    this.dataService.enableLoading();
  }
  
  async calculatePayment():Promise<void>{
    if (!this.validate()) return;
    const response = await this.orderService.calculatePayment(this.order);
    if (!response){
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME]);
      return;
    }
    this.generateOrderBtnIsActive = true
    this.order.subTotal = response.subTotal
    this.order.deliveryCost = response.deliveryCost
    this.order.total = response.total
  }

  onChangeShippingAddress(event: any):void{
    this.calculatePayment();
  }

  onChangeDeliveryMethod(event: any):void{
    
  }

  onChangePaymentMethod(event: any):void{
  }
  
  
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'bg-light');
  }

  private validate(): boolean {
    if (Utils.stringIsEmpty(this.order.delivery.deliveryMethod)) return false;
    if (Utils.stringIsEmpty(this.order.payment.paymentMethod)) return false;
    if (this.order.delivery.deliveryMethod==='delivery') {
      if(Utils.stringIsEmpty(this.order.delivery.shippingAddress.id)) return false
    }
    return true;
  }
  
  onAddressSelectedEvent(event: any):void{
    console.log(event);
    
  }

}
