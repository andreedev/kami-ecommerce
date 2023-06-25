import { Injectable } from '@angular/core';
import { Address } from 'app/core/models';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  displayAddressesModal: boolean = false;
  addresses: Address[]=[];

  constructor() { }
}
