import { Injectable } from '@angular/core';
import { Order } from 'app/core/models';
import { Product } from 'app/core/models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  displayOrderProductsModal: boolean = false;
  orderProducts: Product[] = [];

  displayUpdateOrderStatusModal: boolean = false;
  updateOrderStatusRequest: any = {
    id: undefined,
    currentStatus: undefined,
    newStatus: undefined,
    total: undefined,
    totalPaid: undefined,
    totalRefunded: undefined,
  };

  constructor() { }

  resetUpdateOrderStatusRequest(): void {
    this.updateOrderStatusRequest = {
      id: undefined,
      currentStatus: undefined,
      newStatus: undefined,
      total: undefined,
      totalPaid: undefined,
      totalRefunded: '',
    };
  }
}
