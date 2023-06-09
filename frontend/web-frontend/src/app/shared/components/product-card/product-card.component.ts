import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Constants } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { Product } from 'app/core/models';
import { DataService } from 'app/core/services';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnChanges {
  @Input() product!: Product;
  @Input() type!: string;

  constructor(
    public dataService: DataService,
  ) {}

  ngOnInit(): void {
    const loadedProduct: Product = Utils.getByAttr(this.dataService.cart.products, "id", this.product.id)
    if (loadedProduct) this.product.amount = loadedProduct.amount
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      this.product = changes['product'].currentValue;
    }
  }

  updateProduct() {
    // this.productChange.emit(this.product);
  }

  productDetails(id: any): void {
    //open product details modal
  }

  addToCart(product: Product): void{
    const newAmount = 1;
    this.product.amount = newAmount;
    this.dataService.cart.products.push(product)
    this.dataService.searchResults.data = Utils.updateByAttr(this.dataService.searchResults.data, "id", product.id, "amount", newAmount )
    this.recountTotalAmount()
    this.recalculateSubtotal()
    Utils.updateInLocalStorage(Constants.LOCAL_STORAGE_CART_OBJECT_NAME, this.dataService.cart)
  }

  increaseQuantity(id: string): void {
    const newAmount = ++this.product.amount!;
    this.dataService.cart.products = Utils.updateByAttr(this.dataService.cart.products, "id", id, "amount", newAmount )
    this.dataService.searchResults.data = Utils.updateByAttr(this.dataService.searchResults.data, "id", id, "amount", newAmount )
    this.recountTotalAmount()
    this.recalculateSubtotal()
    Utils.updateInLocalStorage(Constants.LOCAL_STORAGE_CART_OBJECT_NAME, this.dataService.cart)
  }

  decreaseQuantity(id: string): void {
    const newAmount = --this.product.amount!;
    this.dataService.cart.products = Utils.updateByAttr(this.dataService.cart.products, "id", id, "amount", newAmount );
    this.dataService.searchResults.data = Utils.updateByAttr(this.dataService.searchResults.data, "id", id, "amount", newAmount )
    this.recountTotalAmount()
    this.recalculateSubtotal()
    Utils.updateInLocalStorage(Constants.LOCAL_STORAGE_CART_OBJECT_NAME, this.dataService.cart)
  }

  removeFromCart(id: string): void {
    const newAmount = 0;
    this.product.amount = newAmount;
    this.dataService.cart.products = Utils.removeByAttr(this.dataService.cart.products, "id", id)
    this.dataService.searchResults.data = Utils.updateByAttr(this.dataService.searchResults.data, "id", id, "amount", newAmount )
    this.recountTotalAmount()
    this.recalculateSubtotal()
    Utils.updateInLocalStorage(Constants.LOCAL_STORAGE_CART_OBJECT_NAME, this.dataService.cart)
  }

  private recountTotalAmount(): void{
    let totalAmount = 0;
    for (const product of this.dataService.cart.products) {
      totalAmount += product.amount!;
      // chain(totalAmount).add(product.amount!).done()
    }
    this.dataService.cart.totalAmount = totalAmount;
  }

  private recalculateSubtotal(): void{
    let subtotal = 0
    for (const product of this.dataService.cart.products) {
      if (product.discount) {
        // chain(subtotal).add(chain(product.discount.priceWithDiscountApplied!).multiply(product.amount!).done()).done()
        subtotal += Utils.multiply(product.discount.priceWithDiscountApplied!, product.amount!)
      } else {
        // chain(subtotal).add(chain(product.price!).multiply(product.amount!).done()).done()
        subtotal += Utils.multiply(product.price!, product.amount!)
      }
    }
    subtotal = Math.round(subtotal * 100) / 100; 
    this.dataService.cart.subtotal = subtotal
  }
}
