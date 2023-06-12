import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { Category } from 'app/core/models/category';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styles: []
})
export class CategoryCardComponent {
  @Input() category!: Category;

  constructor(
    private router: Router
  ) { }

  filterByCategory():void{
    this.router.navigate([AppRoutes.SEARCH_MODULE_ROUTE_NAME])
  }
}
