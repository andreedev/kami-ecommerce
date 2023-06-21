import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { ApiResponse } from 'app/core/models';
import { AuthDataService, CustomerService, DataService } from 'app/core/services';
import { AddressDataService } from 'app/core/services/data/address-data.service';

@Component({
  selector: 'address-add',
  templateUrl: './address-add.component.html'
})
export class AddressAddComponent{

  message: SafeHtml = '';
  messageClass: string = '';

  lineFocus: boolean = false;

  constructor(
    private customerService: CustomerService,
    public dataService: DataService,
    public authDataService: AuthDataService,
    public addressDataService: AddressDataService,
    private router: Router
  ) { }

  async saveAddress(): Promise<void> {
    if (!this.validate()) return;
    this.message = '';
    this.dataService.enableLoading();
    const response: ApiResponse | null = await this.customerService.saveAddress(this.addressDataService.saveAddressRequest);
    if (response === null) {
      this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME]);
    } else if (response.code!<0) {
      this.messageClass = 'text-red';
      this.message = response.message!;
    } else if (response.code===1){
      this.messageClass = 'text-green';
      this.message = response.message!;
      this.reset();
      this.authDataService.loadProfile();
      setTimeout(() => {
        this.addressDataService.displayAddAddressModal=false;
        this.addressDataService.displayAddressesModal=true;
        this.message = ''
      }, 500);
    }
    this.dataService.disableLoading();
  }

  private validate(): boolean {
    this.messageClass = 'text-red';

    if (Utils.stringIsEmpty(this.addressDataService.saveAddressRequest.line)) {
      this.message = 'Ingrese una dirección';
      return false;
    }

    this.message = '';
    return true;
  }

  private reset():void{
    this.addressDataService.saveAddressRequest={
      line: '',
      reference:''
    }
  }
}
