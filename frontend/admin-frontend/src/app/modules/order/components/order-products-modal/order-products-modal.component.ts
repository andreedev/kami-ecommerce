import { Component } from '@angular/core';
import { DataService, OrderDataService } from 'app/core/services';

@Component({
  selector: 'order-products-modal',
  templateUrl: './order-products-modal.component.html'
})
export class OrderProductsModalComponent {
  
  constructor(
    public dataService: DataService,
    public orderDataService: OrderDataService
  ) { }

}
