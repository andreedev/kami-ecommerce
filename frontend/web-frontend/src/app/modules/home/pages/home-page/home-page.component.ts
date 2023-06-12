import { Component, OnInit } from '@angular/core';
import { Product } from 'app/core/models';
import { Category } from 'app/core/models/category';
import { DataService, ProductService } from 'app/core/services';
import { CategoryService } from 'app/core/services/category.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {

  loadingFeaturedProducts: boolean = true
  featuredProducts: Product[] = []

  loadingCategories: boolean = true
  categories: Category[] = []

  responsiveOptions: any[] = [
    {
          breakpoint: '768px',
          numVisible: 5
      },
  ];

  constructor(
    public dataService: DataService,
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {
    this.loadFeaturedProducts()
    this.loadCategories()
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

  async loadCategories(): Promise<any>{
    setTimeout(async () => {
      const response: Category[] | null = await this.categoryService.getCategories()
      if (response !== null) {
        this.categories = response;
        this.loadingCategories = false
      }
    }, 500);
    
  }
  
  ngOnInit(): void {
    
  }

}
