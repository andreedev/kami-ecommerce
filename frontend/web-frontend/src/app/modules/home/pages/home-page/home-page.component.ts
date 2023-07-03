import { Component, OnInit } from '@angular/core';
import { Product } from 'app/core/models';
import { DataService, ProductService } from 'app/core/services';
import { CategoryDataService } from 'app/core/services/data/category-data.service';
import { CartDataService } from '../../../../core/services/data/cart-data.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {

  loadingFeaturedProducts: boolean = true
  featuredProducts: Product[] = []

  responsiveOptions: any[] = [
    {
      breakpoint: '768px',
      numVisible: 5
    },
  ];

  constructor(
    public dataService: DataService,
    private productService: ProductService,
    public categoryDataService: CategoryDataService,
    private cartDataService: CartDataService
  ) {
    this.loadFeaturedProducts();
    this.categoryDataService.loadCategories();
    this.cartDataService.cartClearedEvent.subscribe((value: any)=>{
      this.featuredProducts.forEach((p) => {
        p.quantity = 0;
      })
    })
  }

  async loadFeaturedProducts(): Promise<any>{
    setTimeout(async () => {
      const response: Product[] | null = await this.productService.getFeaturedProducts()
      if (response !== null) {
        this.featuredProducts = response;
        this.loadingFeaturedProducts = false
      }
    }, 1000);
  }
  
  ngOnInit(): void {
    
  }

}
