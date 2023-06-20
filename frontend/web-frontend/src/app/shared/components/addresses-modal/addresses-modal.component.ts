import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from 'app/core/models';
import { AuthDataService, CustomerService, DataService } from 'app/core/services';

@Component({
  selector: 'addresses-modal',
  templateUrl: './addresses-modal.component.html'
})
export class AddressesModalComponent {
  @Input() displayModal: boolean = false;
  @Input() selectable: boolean = false;

  @Output() addressSelectedEvent = new EventEmitter();

  selected: any;

  constructor(
    public customerService: CustomerService,
    public dataService: DataService,
    public authDataService: AuthDataService
  ) { }

  saveAddress():void{

  }

  deleteAddress():void{
    
  }
}
