import { Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { AuthDataService, CustomerService, DataService, OrderDataService } from 'app/core/services';
import { AddressDataService } from 'app/core/services/data/address-data.service';

@Component({
  selector: 'addresses-modal',
  templateUrl: './addresses-modal.component.html'
})
export class AddressesModalComponent {
  @Input() selectable: boolean = false;

  message: SafeHtml = '';
  messageClass: string = '';

  constructor(
    public orderDataService: OrderDataService,
    public customerService: CustomerService,
    public dataService: DataService,
    public authDataService: AuthDataService,
    public addressDataService: AddressDataService,
    private router: Router
  ) { }

  async deleteAddress(id: string): Promise<void> {
    this.message = '';
    this.dataService.enableLoading();
    const response: boolean | null = await this.customerService.deleteAddress(id);
    if (response === null) {
      this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME]);
    } else if (response === false) {
      this.messageClass = 'text-red';
      this.message = 'Internal error';
    } else if (response === true) {
      this.authDataService.loadProfile();
      if (this.orderDataService.order.delivery.shippingAddress){
        if (this.orderDataService.order.delivery.shippingAddress!.id == id) {
          this.orderDataService.order.delivery.shippingAddress = {
            id: '',
            line: '',
            reference: ''
          }
          this.orderDataService.displayPaymentDetails = false
        }
      }
    }
    this.dataService.disableLoading();
  }

  select(): void {
    this.addressDataService.displayAddressesModal = false;
    if (this.orderDataService.order.delivery.deliveryMethod === 'delivery') {
      this.orderDataService.order.delivery.shippingAddress = this.addressDataService.selectedAddress!;
      this.addressDataService.selectedAddress = undefined
      this.addressDataService.addressSelectedEvent.emit();
    }
  }

}
