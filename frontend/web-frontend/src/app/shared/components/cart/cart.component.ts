import { Component } from '@angular/core';
import { Constants } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { DataService } from 'app/core/services';
import { CartDataService } from 'app/core/services/data/cart-data.service';
import { SearchDataService } from 'app/core/services/data/search-data.service';
import { environment } from 'assets/environments/environment';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  readonly resourcesUrl: string = environment.resourcesUrl;

  constructor(
    public dataService: DataService,
    public cartDataService: CartDataService,
    public searchDataService: SearchDataService,
  ) { }
  
  clear():void{
    this.searchDataService.searchResults.data.forEach((p)=>{
      p.amount = 0
    })
    this.cartDataService.clearCart()
  }

}
