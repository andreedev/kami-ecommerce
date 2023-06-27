import { Injectable } from '@angular/core';
import { Product } from 'app/core/models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  displayOrderProductsModal: boolean = false;
  orderProducts: Product[] = [];

  constructor() { }
}
