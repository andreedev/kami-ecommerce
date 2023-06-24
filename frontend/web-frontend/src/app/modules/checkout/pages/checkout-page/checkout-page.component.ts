import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { ApiResponse } from 'app/core/models';
import { AuthDataService, DataService, OrderDataService, OrderService } from 'app/core/services';
import { AddressDataService } from 'app/core/services/data/address-data.service';
import { CartDataService } from 'app/core/services/data/cart-data.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly constants: typeof Constants = Constants;

  step: number = 1;

  message: SafeHtml = 'Recuerda elegir un tipo de entrega';
  messageClass: string = 'text-dark';

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

  continue(): void {
    if (this.step === 1) {
      if (!this.validateDeliveryData()) return;
      this.step = 2;
    } else if (this.step === 2) {
      if (!this.validatePaymentData()) return;
      this.generateOrder()
    }
  }

  async generateOrder(): Promise<void> {
    this.dataService.enableLoading();
    this.message = ''
    const response: ApiResponse | null = await this.orderService.createOrder(
      this.orderDataService.order.delivery.deliveryMethod,
      this.orderDataService.order.delivery.shippingAddress!.id!,
      this.orderDataService.order.payment.paymentMethod,
      document.querySelector('#file')!
    );
    this.dataService.disableLoading();
    if (response === null) {
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME]);
      return;
    }
    if (response.code === -1) {

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
    let addressId = ''
    if (this.orderDataService.order.delivery.shippingAddress !== undefined) {
      addressId = this.orderDataService.order.delivery.shippingAddress!.id!
    }
    const response = await this.orderService.calculatePayment(
      this.orderDataService.order.delivery.deliveryMethod,
      addressId
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
    if (this.orderDataService.order.delivery.deliveryMethod === 'delivery' &&
      this.orderDataService.order.delivery.shippingAddress != undefined) {
      this.calculatePayment();
      return;
    }
    if (this.orderDataService.order.delivery.deliveryMethod === 'in_store_pickup') {
      this.calculatePayment();
      this.orderDataService.order.delivery.shippingAddress = undefined
      return;
    }
    this.orderDataService.displayPaymentDetails = false;
  }

  onChangePaymentMethod(event: any): void {

  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'bg-light');
    this.orderDataService.reset();
  }

  private validateDeliveryData(): boolean {
    this.messageClass = 'text-red';

    if (Utils.stringIsEmpty(this.orderDataService.order.delivery.deliveryMethod)) {
      this.message = 'Seleccione un tipo de entrega';
      return false;
    }
    if (this.orderDataService.order.delivery.deliveryMethod === 'delivery' &&
      this.orderDataService.order.delivery.shippingAddress === undefined
    ) {
      this.message = 'Seleccione una dirección';
      return false;
    }

    this.message = '';
    return true;
  }

  private validatePaymentData(): boolean {
    this.messageClass = 'text-red';
    if (Utils.stringIsEmpty(this.orderDataService.order.payment.paymentMethod)) {
      this.message = 'Seleccione un método de pago';
      return false;
    }

    const file: HTMLInputElement = document.querySelector('#file')!
    if (Utils.validateFileHasValidExtension(file.value, ['png', 'jpg', 'jpeg', 'pdf'])) {
      this.message = 'La extensión del archivo debe ser en formato png, jpg, jpeg o pdf.';
      return false
    }

    this.message = '';
    return true;
  }


}
