import { Component, OnInit } from '@angular/core';
import { Product } from 'app/core/models';
import { DataService, ProductService } from 'app/core/services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {

  loadingFeaturesProducts: boolean = true
  featuredProducts: Product[] = []

  responsiveOptions: any[] = [
    {
          breakpoint: '768px',
          numVisible: 5
      },
  ];

  constructor(
    public dataService: DataService,
    private productService: ProductService
  ) {
    this.loadFeaturedProducts()
  }

  async loadFeaturedProducts(): Promise<any>{
    setTimeout(async () => {
      const response: Product[] | null = await this.productService.getFeaturedProducts()
      if (response !== null) {
        this.featuredProducts = response;
        this.loadingFeaturesProducts = false
      }
    }, 1000);
    
  }
  
  ngOnInit(): void {
    
  }

}
