import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { OrderStatus } from 'app/core/enums/order-status';
import { Utils } from 'app/core/helpers/utils';
import { DynamicReport, Order } from 'app/core/models';
import { AuthDataService, DataService, OrderDataService, OrderService } from 'app/core/services';
import { WebsocketService } from 'app/core/services/websocket/websocket.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  providers: [MessageService]
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
    private router: Router,
    private websocketService: WebsocketService,
    private messageService: MessageService,
  ) {
    this.searchOrders();
    this.websocketService.connect(`order-status-updated-event/${authDataService.loggedInCustomer!.id}`);
    this.websocketService.subscribeToData().subscribe((data: any) => {
      const parsedData = JSON.parse(data);
      const orderNumber = parsedData.orderNumber;
      const status = parsedData.status;
      this.searchResults.data.map((element)=>{
        if (element.orderNumber === orderNumber){
          element.status = status;
          this.handleOrderStatusUpdatedEvent(orderNumber, status);
        }
      })
    });
  }

  filterByStatus():void{
    this.page = 1;
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


  private handleOrderStatusUpdatedEvent(orderNumber: string, newStatus: string):void{
    if (newStatus === OrderStatus.DELIVERED.getCode()){
      return this.messageService.add({
        severity: 'success',
        summary: 'Orden entregada',
        detail: `Tu orden #${orderNumber} ha sido entregada con éxito!`,
        life: 5000
      });
    } else if (newStatus === OrderStatus.CANCELED.getCode()){
      return this.messageService.add({
        severity: 'error',
        summary: 'Orden cancelada',
        detail: `Tu orden #${orderNumber} ha sido sido cancelada.`,
        life: 5000
      });
    } else if (newStatus === OrderStatus.PAYMENT_CONFIRMED.getCode()){
      return this.messageService.add({
        severity: 'info',
        summary: 'Pago confirmado',
        detail: `Hemos confirmado el pago de tu orden #${orderNumber}.`,
        life: 5000
      });
    } else if (newStatus === OrderStatus.SHIPPED.getCode()){
      return this.messageService.add({
        severity: 'info',
        summary: 'Orden en camino',
        detail: `Los productos de tu orden #${orderNumber} ya se encuentran en camino.`,
        life: 7000,
        contentStyleClass: 'bg-cyan text-white'
      });
    }
  }
}
