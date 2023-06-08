import { Component, Input } from '@angular/core';
import { Utils } from 'app/core/helpers/utils';
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

  productDetails(id: any): void {
    //open product details modal
  }

  addToCart(product: Product): void{
    this.dataService.cart.products.push(product)
    this.product.amount = 1;
    this.dataService.cart.totalAmount++;
  }

  increaseQuantity(id: string): void {
    const newAmount = this.product.amount!++;
    this.dataService.cart.products = Utils.updateByAttr(this.dataService.cart.products, "id", id, "amount", newAmount )
    this.dataService.cart.totalAmount++;
  }

  decreaseQuantity(id: string): void {
    const newAmount = this.product.amount!--;
    this.dataService.cart.products = Utils.updateByAttr(this.dataService.cart.products, "id", id, "amount", newAmount );
    this.dataService.cart.totalAmount--;
  }

  removeFromCart(id: string): void {
    this.dataService.cart.products = Utils.removeByAttr(this.dataService.cart.products, "id", id)
    this.product.amount = 0;
    this.dataService.cart.totalAmount--;
  }
}
