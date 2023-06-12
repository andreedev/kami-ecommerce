import { Injectable } from '@angular/core';
import { Category } from 'app/core/models/category';
import { CategoryService } from '../category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {

  loadingCategories: boolean = true
  categories: Category[] = []

  constructor(
    private categoryService: CategoryService
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
}
