import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { Category } from 'app/core/models/category';
import { SearchDataService } from 'app/core/services';
import { CategoryDataService } from '../../../../core/services/data/category-data.service';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styles: []
})
export class CategoryCardComponent {
  @Input() category!: Category;

  constructor(
    private router: Router,
    public categoryDataService: CategoryDataService
  ) { }

}
