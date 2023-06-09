import { Component } from '@angular/core';
import { Constants } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { DataService } from 'app/core/services';
import { environment } from 'assets/environments/environment';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  readonly resourcesUrl: string = environment.resourcesUrl;

  constructor(
    public dataService: DataService
  ) { }

  clear():void{
    this.dataService.cart.products = []
    this.dataService.cart.totalAmount = 0
    this.dataService.cart.subtotal = 0.00
    Utils.deleteInLocalStorage(Constants.LOCAL_STORAGE_CART_OBJECT_NAME)
    this.dataService.searchResults.data.forEach((p)=>{
      p.amount = 0
    })
  }
  


}
