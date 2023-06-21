import { EventEmitter, Injectable } from '@angular/core';
import { Address } from 'app/core/models';

@Injectable({
  providedIn: 'root'
})
export class AddressDataService {

  displayAddressesModal: boolean = false;

  displayAddAddressModal: boolean = false;
  saveAddressRequest: Address = {
    line: '',
    reference:''
  }

  addressSelectedEvent: EventEmitter<any> = new EventEmitter();


  constructor() { }
}
