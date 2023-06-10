import { Injectable } from '@angular/core';
import { Product } from 'app/core/models';

@Injectable({
  providedIn: 'root'
})
export class ProductModalDataService {

  productModal: Product | undefined;

  display: boolean = false;

  constructor() { }
}
