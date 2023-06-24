import { Injectable } from '@angular/core';
import { Order } from 'app/core/models';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  order: Order = {
    delivery : {
      deliveryMethod: '',
      shippingAddress: undefined
    },
    payment : {
      paymentMethod: ''
    },
    subTotal: undefined,
    deliveryCost: undefined,
    total: undefined
  }

  displayPaymentDetails: boolean = false;
  
  displayOrderDetailModal: boolean = false;

  constructor() { }

  reset():void{
    this.order = {
      delivery : {
        deliveryMethod: '',
        shippingAddress: undefined
      },
      payment : {
        paymentMethod: ''
      },
      subTotal: undefined,
      deliveryCost: undefined,
      total: undefined
    }
  
    this.displayPaymentDetails = false;
  }
}
