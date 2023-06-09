import { Component, Input } from '@angular/core';
import { Constants } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { Product } from 'app/core/models';
import { DataService } from 'app/core/services';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() type!: string;

  constructor(
    public dataService: DataService,
  ) {
    
  }

  ngOnInit(): void {
    const loadedProduct: Product = Utils.getByAttr(this.dataService.cart.products, "id", this.product.id)
    if (loadedProduct) this.product.amount = loadedProduct.amount
  }

  productDetails(id: any): void {
    //open product details modal
  }

  addToCart(product: Product): void{
    this.dataService.cart.products.push(product)
    this.product.amount = 1;
    this.recountTotalAmount()
    Utils.updateInLocalStorage(Constants.LOCAL_STORAGE_CART_OBJECT_NAME, this.dataService.cart)
  }

  increaseQuantity(id: string): void {
    const newAmount = ++this.product.amount!;
    this.dataService.cart.products = Utils.updateByAttr(this.dataService.cart.products, "id", id, "amount", newAmount )
    this.recountTotalAmount()
    Utils.updateInLocalStorage(Constants.LOCAL_STORAGE_CART_OBJECT_NAME, this.dataService.cart)
  }

  decreaseQuantity(id: string): void {
    const newAmount = --this.product.amount!;
    this.dataService.cart.products = Utils.updateByAttr(this.dataService.cart.products, "id", id, "amount", newAmount );
    this.recountTotalAmount()
    Utils.updateInLocalStorage(Constants.LOCAL_STORAGE_CART_OBJECT_NAME, this.dataService.cart)
  }

  removeFromCart(id: string): void {
    this.dataService.cart.products = Utils.removeByAttr(this.dataService.cart.products, "id", id)
    this.product.amount = 0;
    this.recountTotalAmount()
    Utils.updateInLocalStorage(Constants.LOCAL_STORAGE_CART_OBJECT_NAME, this.dataService.cart)
  }

  private recountTotalAmount(): void{
    let totalAmount = 0;
    for (const cartProduct of this.dataService.cart.products) {
      totalAmount += cartProduct.amount!;
    }
    this.dataService.cart.totalAmount = totalAmount;
  }
}
