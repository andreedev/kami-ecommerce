import { Component, Input } from '@angular/core';
import { Category } from './../../../../core/models/category';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CategoryService, DataService } from 'app/core/services';
import { HttpErrorResponse } from '@angular/common/http';
import { Utils } from 'app/core/helpers/utils';
import { CategoryDataService } from 'app/core/services/data/category-data.service';

@Component({
  selector: 'category-create',
  templateUrl: './category-create.component.html'
})
export class CategoryCreateComponent {
  category: Category = {
    name: "",
    mediaUrl: ""
  };

  //validation
  message: SafeHtml = '';
  messageClass: string = '';

  constructor(
    public categoryDataService: CategoryDataService,
    public dataService: DataService,
    private categoryService: CategoryService,
    private sanitizer: DomSanitizer
  ) { }


  async create(): Promise<void> {
    if (!this.validate()) return;
    this.dataService.enableLoading();
    const response: any = await this.categoryService.createCategory(this.category);
    if (response === 1) {
      this.messageClass = 'text-green';
      this.message = 'Product created successfully';
      this.reset();
      this.categoryDataService.dataUpdatedEvent.emit()
      setTimeout(() => {
        this.categoryDataService.displayCategoryCreateModal = false
        this.message = '';
      }, 1000);
    } else if (response instanceof HttpErrorResponse) {
      this.messageClass = 'text-red';
      const errorMessages = response.error.errorMessages;
      this.message = this.sanitizer.bypassSecurityTrustHtml(
        errorMessages.join('<br>')
      );
    }
    this.dataService.disableLoading();
  }


  private validate(): boolean {
    this.messageClass = 'text-red';

    if (Utils.stringIsEmpty(this.category.name!)) {
      this.message = 'The name is required';
      return false;
    }

    this.message = '';
    return true;
  }

  private reset(): void {
    this.category = {
      name: "",
      mediaUrl: ""
    };
  }

}
