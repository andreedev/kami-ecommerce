import { Injectable } from '@angular/core';
import { Category } from 'app/core/models/category';
import { CategoryService } from '../api/category.service';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { Utils } from '../../helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {

  loadingCategories: boolean = true
  categories: Category[] = []

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  async loadCategories(): Promise<any> {
    if (this.loadingCategories && this.categories.length > 0) return;
    if (this.categories.length === 0) {
      const response = await this.categoryService.getCategories()
      this.categories = response;
      this.loadingCategories = false;
    }
  }

  filterByCategory(categoryName: string): void {
    const queryParams = {
      query: categoryName
    };
    this.router.navigate([AppRoutes.SEARCH_MODULE_ROUTE_NAME], { queryParams, queryParamsHandling: "merge" });
    Utils.scrollToTop();
  }
}
