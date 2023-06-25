import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { CustomerDataService, CustomerService, DataService } from 'app/core/services';

@Component({
  selector: 'addresses-modal',
  templateUrl: './addresses-modal.component.html'
})
export class AddressesModalComponent implements OnInit {
  constructor(
    public dataService: DataService,
    public customerService: CustomerService,
    public customerDataService: CustomerDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAddresses();
  }

  async findAddresses():Promise<void>{
    this.dataService.enableLoading();
    const response = await this.customerService.findAddresses(this.customerDataService.addresses);
    this.dataService.disableLoading();
    if (response === null) {
      this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME]);
    } else {
      this.customerDataService.addresses = response;
    }
  }
}
