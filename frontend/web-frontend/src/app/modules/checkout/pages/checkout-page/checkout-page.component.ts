import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { AuthDataService, DataService, OrderDataService, OrderService } from 'app/core/services';
import { CartDataService } from 'app/core/services/data/cart-data.service';
import { Renderer2 } from '@angular/core';
import { Order } from 'app/core/models';
import { Utils } from 'app/core/helpers/utils';
import { AddressDataService } from 'app/core/services/data/address-data.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly constants: typeof Constants = Constants;

  message: SafeHtml = 'Recuerda elegir un tipo de entrega y de pago';
  messageClass: string = 'text-dark';

  generateOrderBtnIsActive: boolean = false

  constructor(
    public orderDataService: OrderDataService,
    private orderService: OrderService,
    public cartDataService: CartDataService,
    public authDataService: AuthDataService,
    private router: Router,
    private renderer: Renderer2,
    public addressDataService: AddressDataService
  ) { }

  ngOnInit(): void {
    if (this.cartDataService.cart.products.length < 1) {
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME])
    }
    this.renderer.addClass(document.body, 'bg-light');
  }

  generateOrder(): void {
    
  }

  async calculatePayment(): Promise<void> {
    if (!this.validate()) return;
    const response = await this.orderService.calculatePayment(this.orderDataService.order);
    if (!response) {
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME]);
      return;
    }
    this.generateOrderBtnIsActive = true
    this.orderDataService.order.subTotal = response.subTotal
    this.orderDataService.order.deliveryCost = response.deliveryCost
    this.orderDataService.order.total = response.total
  }

  onChangeShippingAddress(event: any): void {

  }

  onChangeDeliveryMethod(event: any): void {
  }

  onChangePaymentMethod(event: any): void {
  }

  onAddressSelectedEvent(event: any): void {
    console.log(event);

    this.orderDataService.order.delivery.shippingAddress = event
    this.calculatePayment();
  }


  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'bg-light');
    this.authDataService.profileLoadedEvent.unsubscribe();
  }

  private validate(): boolean {
    if (Utils.stringIsEmpty(this.orderDataService.order.delivery.deliveryMethod)) return false;
    if (Utils.stringIsEmpty(this.orderDataService.order.payment.paymentMethod)) return false;
    if (this.orderDataService.order.delivery.deliveryMethod === 'delivery') {
      if (Utils.stringIsEmpty(this.orderDataService.order.delivery.shippingAddress.id!)) return false
    }
    if (!(this.orderDataService.order.subTotal && this.orderDataService.order.deliveryCost && this.orderDataService.order.total)) return false;
    return true;
  }



}
