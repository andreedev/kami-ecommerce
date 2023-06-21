import { Injectable } from '@angular/core';
import { Order } from 'app/core/models';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  order: Order = {
    delivery : {
      deliveryMethod: '',
      date: '2023-06-01',
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

  constructor() { }
}
