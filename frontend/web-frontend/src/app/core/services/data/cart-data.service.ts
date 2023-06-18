import { Injectable } from '@angular/core';
import { Constants } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { Product } from 'app/core/models';
import { Cart } from 'app/core/models/cart';
import { ProductService } from '../api/product.service';
import { CartService } from '../api/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {

  displayCart: boolean = false
  loadingCart: boolean = true
  cart: Cart = {
    products: [],
    subtotal: 0.00,
    totalAmount: 0
  }

  lastUpdate: number = new Date().getTime();
  updateTimeout: any

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.loadCart()
  }

  async loadCart() {
    this.loadingCart = true
    const loadedCart = Utils.loadFromLocalStorage(Constants.LOCAL_STORAGE_CART_OBJECT_NAME)
    if (loadedCart && typeof loadedCart === 'object' && 'products' in loadedCart) {
      this.cart = loadedCart as Cart;
      if (this.cart.products.length >= 0) {
        const response: Cart | null = await this.productService.loadGuestCart(this.cart.products)
        if (response !== null) {
          this.cart = response;
          this.updateCartInLocalStorage()
        }
      }
      this.loadingCart = false
    }
  }

  updateCart(product: Product, operation: string): void {
    if (operation === 'create') {
      this.cart.products.push(product)
    } else if (operation === 'update') {
      this.cart.products = Utils.updateByAttr(this.cart.products, "id", product.id, "amount", product.amount)
    } else if (operation === 'delete') {
      this.cart.products = Utils.removeByAttr(this.cart.products, "id", product.id)
    }
    this.updateCartInLocalStorage();
    
    const currentTime = new Date().getTime();
    const timeSinceLastUpdate = currentTime - this.lastUpdate;
  
    if (timeSinceLastUpdate >= Constants.UPDATE_CART_WAIT_TIME) {
      this.updateCartOnTimeout();
    } else {
      clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(() => {
        this.updateCartOnTimeout();
      }, Constants.UPDATE_CART_WAIT_TIME);
    }
  }

  updateCartOnTimeout(): void {
    clearTimeout(this.updateTimeout);
    this.cartService.updateCart(this.cart.products);
    this.lastUpdate = new Date().getTime();
  }

  updateCartInLocalStorage(): void {
    const cartCopy = { ...this.cart }
    cartCopy.products = cartCopy.products.map((product: Product) => {
      const { id, amount } = product;
      return { id, amount };
    });
    Utils.updateInLocalStorage(Constants.LOCAL_STORAGE_CART_OBJECT_NAME, cartCopy);
  }

}
