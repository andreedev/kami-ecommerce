import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes, Constants } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { Order } from 'app/core/models';
import { AuthDataService, CustomerService, DataService, OrderDataService } from 'app/core/services';

@Component({
  selector: 'order-detail-modal',
  templateUrl: './order-detail-modal.component.html'
})
export class OrderDetailModalComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly constants: typeof Constants = Constants;
  readonly utils: typeof Utils = Utils;

  constructor(
    public orderDataService: OrderDataService, 
    public customerService: CustomerService,
    public dataService: DataService,
    public authDataService: AuthDataService,
    private router: Router
  ) { }
}
