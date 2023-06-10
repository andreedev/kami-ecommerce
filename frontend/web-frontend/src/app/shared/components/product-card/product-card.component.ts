import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Utils } from 'app/core/helpers/utils';
import { Product } from 'app/core/models';
import { DataService } from 'app/core/services';
import { CartDataService } from 'app/core/services/data/cart-data.service';
import { ProductModalDataService } from 'app/core/services/data/product-modal-data.service';
import { SearchDataService } from 'app/core/services/data/search-data.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnChanges {
  @Input() product!: Product;
  @Input() type!: string;
  @Input() displayCartInteractionBtn: boolean = false;

  images: any[] = [];

  responsiveOptions: any[] = [
    {
          breakpoint: '768px',
          numVisible: 5
      },
  ];

  constructor(
    public dataService: DataService,
    public cartDataService: CartDataService,
    public searchDataService: SearchDataService,
    public productModalDataService: ProductModalDataService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
        const loadedProduct: Product = Utils.getByAttr(this.cartDataService.cart.products, "id", this.product.id)
        if (loadedProduct) this.product.amount = loadedProduct.amount
        this.product.mediaUrls!.forEach((m)=>{
          this.images.push({src:m})
        })
    }
  }

  ngOnInit(): void {
    
  }

  productDetails(product: Product): void {
    this.productModalDataService.display = true
    this.productModalDataService.productModal = product
  }

  addToCart(product: Product): void {
    const newAmount = 1;
    this.product.amount = newAmount;
    this.cartDataService.updateCart(product, 'create')
    this.searchDataService.searchResults.data = Utils.updateByAttr(this.searchDataService.searchResults.data, "id", product.id, "amount", newAmount)
    this.recountTotalAmount()
    this.recalculateSubtotal()
  }

  increaseQuantity(id: string): void {
    const newAmount = ++this.product.amount!;
    this.cartDataService.updateCart({id, amount: newAmount}, 'update')
    this.searchDataService.searchResults.data = Utils.updateByAttr(this.searchDataService.searchResults.data, "id", id, "amount", newAmount)
    this.recountTotalAmount()
    this.recalculateSubtotal()
  }

  decreaseQuantity(id: string): void {
    const newAmount = --this.product.amount!;
    this.cartDataService.updateCart({id, amount: newAmount}, 'update')
    this.searchDataService.searchResults.data = Utils.updateByAttr(this.searchDataService.searchResults.data, "id", id, "amount", newAmount)
    this.recountTotalAmount()
    this.recalculateSubtotal()
  }

  removeFromCart(id: string): void {
    const newAmount = 0;
    this.product.amount = newAmount;
    this.cartDataService.updateCart({id, amount: newAmount}, 'delete')
    this.searchDataService.searchResults.data = Utils.updateByAttr(this.searchDataService.searchResults.data, "id", id, "amount", newAmount)
    this.recountTotalAmount()
    this.recalculateSubtotal()
  }

  private recountTotalAmount(): void {
    let totalAmount = 0;
    for (const product of this.cartDataService.cart.products) {
      totalAmount += product.amount!;
    }
    this.cartDataService.cart.totalAmount = totalAmount;
  }

  private recalculateSubtotal(): void {
    let subtotal = 0
    for (const product of this.cartDataService.cart.products) {
      if (product.discount) {
        subtotal += Utils.multiply(product.discount.priceWithDiscountApplied!, product.amount!)
      } else {
        subtotal += Utils.multiply(product.price!, product.amount!)
      }
    }
    subtotal = Math.round(subtotal * 100) / 100;
    this.cartDataService.cart.subtotal = subtotal
  }

  
}
