import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { OrderStatus } from 'app/core/enums/order-status';
import { Utils } from 'app/core/helpers/utils';
import { DynamicReport, Order } from 'app/core/models';
import { AuthDataService, DataService, OrderDataService, OrderService } from 'app/core/services';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly constants: typeof Constants = Constants;
  readonly utils: typeof Utils = Utils;


  searchResults: DynamicReport<Order> = {
    data: [],
    totalPages: 0
  }
  loadingOrders: boolean = true;
  query: string = ''
  page: number = 1
  statusFilter: string = ''
  pagesUI: any[] = [];


  constructor(
    private orderService: OrderService,
    public dataService: DataService,
    public authDataService: AuthDataService,
    public orderDataService: OrderDataService,
    private router: Router
  ) {
    this.searchOrders();
  }

  async searchOrders(): Promise<void> {
    this.dataService.enableLoading();
    const response: any = await this.orderService.searchOrders(this.query, this.page, this.statusFilter);
    if (response === null) {
      this.router.navigate([AppRoutes.HOME_MODULE_ROUTE_NAME]);
      return;
    }
    this.searchResults = response;
    this.pagesUI = Utils.generatePagesUIArray(response.totalPages, this.page);
    this.loadingOrders = false;
    this.dataService.disableLoading();
    console.log(response);
  }

  updatePage(page: number): void {
    if (page != this.page) {
      this.page = page;
      this.searchOrders();
    }
  }

  pay(order: Order): void {
    this.orderDataService.order = order;
  }

  orderDetails(order: Order): void {
    this.orderDataService.order = order;
    this.orderDataService.displayOrderDetailModal = true;
  }

  
}
