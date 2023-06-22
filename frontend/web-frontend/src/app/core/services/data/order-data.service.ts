import { Injectable } from '@angular/core';
import { Order } from 'app/core/models';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  order: Order = {
    delivery : {
      deliveryMethod: '',
      shippingAddress: {
        id: '',
        line: '',
        reference: ''
      }
    },
    payment : {
      paymentMethod: ''
    },
    subTotal: undefined,
    deliveryCost: undefined,
    total: undefined
  }

  displayPaymentDetails: boolean = false;

  constructor() { }

  reset():void{
    this.order = {
      delivery : {
        deliveryMethod: '',
        shippingAddress: {
          id: '',
          line: '',
          reference: ''
        }
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
