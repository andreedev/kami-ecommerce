import { Injectable } from '@angular/core';
import { Category } from 'app/core/models/category';
import { CategoryService } from '../api/category.service';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {

  loadingCategories: boolean = true
  categories: Category[] = []

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  async loadCategories(): Promise<any>{
    setTimeout(async () => {
      if (this.categories.length === 0){
        const response: Category[] | null = await this.categoryService.getCategories()
        if (response !== null) {
          this.categories = response;
          this.loadingCategories = false
        }
      }
    }, 500);
  }

  filterByCategory(categoryName: string):void{
    const queryParams = {
      query: "",
      categoryFilter : categoryName
    };
    this.router.navigate([AppRoutes.SEARCH_MODULE_ROUTE_NAME], { queryParams, queryParamsHandling: "merge" });
  }
}
