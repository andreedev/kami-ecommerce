import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { OrderService, DataService, AuthDataService, OrderDataService } from 'app/core/services';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly constants: typeof Constants = Constants;
  readonly utils: typeof Utils = Utils;

  orderProcessing: boolean = false;
  message: string = '';
  messageClass: string = '';

  constructor(
    private orderService: OrderService,
    public dataService: DataService,
    public authDataService: AuthDataService,
    public orderDataService: OrderDataService,
    private router: Router
  ) {

  }
  ngOnDestroy(): void {
    this.orderDataService.reset();
  }

  ngOnInit(): void {
    if (!this.orderDataService.order.id) {
      this.router.navigate([AppRoutes.ORDERS_COMPONENT_ROUTE_NAME]);
    }
    console.log(this.orderDataService.order);
  }

  validateProcessOrderRequest(): boolean {
    this.messageClass = 'text-red';
    const file: HTMLInputElement = document.querySelector('#file')!
    if (Utils.validateFileHasValidExtension(file.value, ['png', 'jpg', 'jpeg', 'pdf'])) {
      this.message = 'La extensión del archivo debe ser en formato png, jpg, jpeg o pdf.';
      return false
    }

    this.message = '';
    return true;
  }
}