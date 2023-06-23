import { Injectable } from '@angular/core';
import { Constants } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { Product } from 'app/core/models';
import { Cart } from 'app/core/models/cart';
import { ProductService } from '../api/product.service';
import { CartService } from '../api/cart.service';
import { AuthDataService } from './auth-data.service';
import { AuthStatus } from 'app/core/enums/auth-status';

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
    private cartService: CartService,
    private authDataService: AuthDataService,
  ) {
    this.loadLocalCart();
    this.subscribeToProfileLoadedEvent()
  }

  subscribeToProfileLoadedEvent(): void {
    this.authDataService.profileLoadedEvent.subscribe((value) => {
      if (value) {
        if (!this.authDataService.loggedInCustomer!.cart || !this.authDataService.loggedInCustomer!.cart.products) return;
        if (!(this.authDataService.loggedInCustomer!.cart!.products.length === 0 && this.cart.products.length > 0)) {
          this.cart = this.authDataService.loggedInCustomer!.cart!;
          this.loadingCart = false;
          this.updateCartInLocalStorage();
        } else {
          this.cartService.updateCart(this.cart.products);
        }
      }
    });
  }


  async loadLocalCart() {
    this.loadingCart = true
    const loadedCart = Utils.loadFromLocalStorage(Constants.LOCAL_STORAGE_CART_OBJECT_NAME)
    if (loadedCart && typeof loadedCart === 'object' && 'products' in loadedCart) {
      this.cart = loadedCart as Cart;
      if (this.cart.products.length > 0) {
        const response: Cart | null = await this.productService.loadGuestCart(this.cart.products)
        if (response !== null) {
          this.cart = response;
          this.updateCartInLocalStorage();
        }
      }
    }
    this.loadingCart = false
  }

  updateCart(product: Product, operation: string): void {
    if (operation === 'create') {
      this.cart.products.push(product)
    } else if (operation === 'update') {
      this.cart.products = Utils.updateByAttr(this.cart.products, "id", product.id, "quantity", product.quantity)
    } else if (operation === 'delete') {
      this.cart.products = Utils.removeByAttr(this.cart.products, "id", product.id)
    }
    this.updateCartInLocalStorage();

    if (this.authDataService.authStatus.getValue() !== AuthStatus.LOGGED_IN.getName()) return;
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
      const { id, quantity } = product;
      return { id, quantity };
    });
    Utils.updateInLocalStorage(Constants.LOCAL_STORAGE_CART_OBJECT_NAME, cartCopy);
  }

  clearCart(updateInDb: boolean=true): void {
    this.cart.products = []
    this.cart.totalAmount = 0
    this.cart.subtotal = 0.00
    Utils.deleteInLocalStorage(Constants.LOCAL_STORAGE_CART_OBJECT_NAME)
    if (this.authDataService.authStatus.value !== AuthStatus.LOGGED_IN.getName() || !updateInDb) return;
    this.cartService.updateCart([]);
  }

  saveCart(): void {
    if (this.authDataService.authStatus.value !== AuthStatus.LOGGED_IN.getName()) return;
    this.cartService.updateCart(this.cart.products);
  }

}
