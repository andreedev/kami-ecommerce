import { Component, Input } from '@angular/core';
import { Product } from 'app/core/models';
import { DataService } from 'app/core/services';

@Component({
  selector: 'product-grid-card',
  templateUrl: './product-grid-card.component.html'
})
export class ProductGridCardComponent {
  @Input() product!: Product;

  constructor(
    public dataService: DataService,
  ) { }

  addToCart(id: string): void{
    this.dataService.cart.products?.push({id})
    this.product.amount = 1;
  }

  productDetails(id: any): void {
    //open product details modal
  }

  increaseQuantity(id: string): void {
    
  }

  decreaseQuantity(id: string): void {
    
  }

  removeFromCart(id: string): void {
    
  }
}
