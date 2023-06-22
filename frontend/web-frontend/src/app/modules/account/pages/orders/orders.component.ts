import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { OrderStatus } from 'app/core/enums/order-status';
import { Utils } from 'app/core/helpers/utils';
import { DynamicReport, Order } from 'app/core/models';
import { AuthDataService, DataService, OrderService } from 'app/core/services';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly constants: typeof Constants = Constants;


  searchResults: DynamicReport<Order> = {
    data: [],
    totalPages: 0
  }
  loadingOrders: boolean = true;
  query: string = ''
  page: number = 1
  statusFilter: string = ''
  pagesUI: any[] = [];
  
  //process order
  orderProcessing: boolean = false;
  message: string = '';
  messageClass: string = '';

  constructor(
    private orderService: OrderService,
    public dataService: DataService,
    public authDataService: AuthDataService,
    private router: Router
  ) {
    this.searchOrders();
  }

  async searchOrders():Promise<void>{
    this.dataService.enableLoading();
    const response: any = await this.orderService.searchOrders(this.query, this.page, this.statusFilter);
    if (response===null) {
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

  processOrder():void{

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

  getClassByOrderStatus(value: string): string {
    if (value===OrderStatus.PENDING.getCode()){
      return 'bg-light';
    } else if (value===OrderStatus.PAYMENT_IN_PROCESS.getCode()){
      return 'bg-cyan text-white';
    } else if (value ===OrderStatus.PAYMENT_CONFIRMED.getCode()){
      return 'bg-orange text-white';
    } else if (value ===OrderStatus.SHIPPED.getCode()){
      return 'bg-blue text-white';
    } else if (value ===OrderStatus.DELIVERED.getCode()){
      return 'bg-green text-white';
    } else if (value ===OrderStatus.CANCELLED.getCode()){
      return 'bg-red text-white';
    } else{
      return ''
    }
  }

  getDescriptionByOrderStatus(value: string): string {
    if (value===OrderStatus.PENDING.getCode()){
      return 'Pendiente'
    } else if (value===OrderStatus.PAYMENT_IN_PROCESS.getCode()){
      return 'Pago en proceso'
    } else if (value ===OrderStatus.PAYMENT_CONFIRMED.getCode()){
      return 'Pago confirmado'
    } else if (value ===OrderStatus.SHIPPED.getCode()){
      return 'En camino'
    } else if (value ===OrderStatus.DELIVERED.getCode()){
      return 'Entregado';
    } else if (value ===OrderStatus.CANCELLED.getCode()){
      return 'Cancelado';
    } else{
      return ''
    }
  }
}
