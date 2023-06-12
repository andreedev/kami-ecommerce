import { EventEmitter, Injectable } from '@angular/core';
import { Category } from 'app/core/models';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {
  displayCategoryCreateModal: boolean = false
  displayCategoryUpdateModal: boolean = false
  displayCategoryDeleteModal: boolean = false

  selectedCategory!: Category;

  dataUpdatedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

}
