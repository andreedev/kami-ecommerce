import { Component, OnInit, Renderer2 } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { ApiResponse } from 'app/core/models';
import { AuthDataService, DataService, OrderDataService, OrderService } from 'app/core/services';
import { AddressDataService } from 'app/core/services/data/address-data.service';
import { CartDataService } from 'app/core/services/data/cart-data.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly constants: typeof Constants = Constants;

  message: SafeHtml = 'Recuerda elegir un tipo de entrega y pago';
  messageClass: string = 'text-dark';

  items: MenuItem[] = [
    {
      label: 'Entrega',
      routerLink: '',
      icon: 'border-radius-15px'
    },
    {
      label: 'Pago',
      routerLink: 'payment'
    },
  ];

  constructor(
    public orderDataService: OrderDataService,
    private orderService: OrderService,
    public cartDataService: CartDataService,
    public dataService: DataService,
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
    this.addressDataService.addressSelectedEvent.subscribe((value) => {
      this.calculatePayment();
    })
  }

  async generateOrder(): Promise<void> {
    if (!this.validate()) return;
    this.dataService.enableLoading();
    const response: ApiResponse | null = await this.orderService.createOrder(
      this.orderDataService.order.delivery.deliveryMethod,
      this.orderDataService.order.delivery.shippingAddress.id!,
      this.orderDataService.order.payment.paymentMethod
    );
    this.dataService.disableLoading();
    if (response === null) {
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME]);
      return;
    }
    if (response.code === -1) {
      //insufficient stock
      return;
    }
    if (response.code === 1) {
      this.cartDataService.clearCart(false);
      this.orderDataService.reset();
      this.orderDataService.order = response.data;
      this.router.navigate([AppRoutes.ORDER_DETAIL_COMPONENT_ROUTE_NAME]);
    }
  }

  async calculatePayment(): Promise<void> {
    const response = await this.orderService.calculatePayment(
      this.orderDataService.order.delivery.deliveryMethod,
      this.orderDataService.order.delivery.shippingAddress.id!
    );
    if (!response) {
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME]);
      return;
    }
    this.orderDataService.order.subTotal = response.subTotal
    this.orderDataService.order.deliveryCost = response.deliveryCost
    this.orderDataService.order.total = response.total
    this.orderDataService.displayPaymentDetails = true
  }


  onChangeDeliveryMethod(event: any): void {
    if (this.orderDataService.order.delivery.deliveryMethod === 'delivery' && this.orderDataService.order.delivery.shippingAddress.id != '') {
      this.calculatePayment();
      return;
    }
    if (this.orderDataService.order.delivery.deliveryMethod === 'in_store_pickup') {
      this.calculatePayment();
      return;
    }
    this.orderDataService.displayPaymentDetails = false;
  }

  onChangePaymentMethod(event: any): void {

  }



  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'bg-light');
  }

  private validate(): boolean {
    this.messageClass = 'text-red';

    if (Utils.stringIsEmpty(this.orderDataService.order.delivery.deliveryMethod)) {
      this.message = 'Seleccione un tipo de entrega';
      return false;
    }
    if (Utils.stringIsEmpty(this.orderDataService.order.payment.paymentMethod)) {
      this.message = 'Seleccione un método de pago';
      return false;
    }
    if (this.orderDataService.order.delivery.deliveryMethod === 'delivery' &&
      Utils.stringIsEmpty(this.orderDataService.order.delivery.shippingAddress.id!)
    ) {
      this.message = 'Seleccione una dirección';
      return false;
    }

    this.message = '';
    return true;
  }



}
