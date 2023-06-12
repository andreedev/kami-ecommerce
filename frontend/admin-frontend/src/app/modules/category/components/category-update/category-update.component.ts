import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Utils } from 'app/core/helpers/utils';
import { Category } from 'app/core/models';
import { DataService } from 'app/core/services';
import { CategoryService } from 'app/core/services/category.service';
import { CategoryDataService } from 'app/core/services/data/category-data.service';

@Component({
  selector: 'category-update',
  templateUrl: './category-update.component.html'
})
export class CategoryUpdateComponent {
  //validate
  message: SafeHtml = '';
  messageClass: string = '';

  constructor(
    public categoryDataService: CategoryDataService,
    public dataService: DataService,
    private categoryService: CategoryService,
    private sanitizer: DomSanitizer
  ) { }


  async update(): Promise<void> {
    if (!this.validate()) return;
    this.dataService.enableLoading();
    const response: any = await this.categoryService.updateCategory(this.categoryDataService.selectedCategory);
    if (response===1) {
      this.messageClass = 'text-green';
      this.message = 'Updated successfully';
      this.reset();
      this.categoryDataService.dataUpdatedEvent.emit()
      setTimeout(() => {
        this.categoryDataService.displayCategoryUpdateModal = false
        this.message = '';
      }, 1000);
    } else if (response===0){
      this.messageClass = 'text-red';
      this.message = 'The data is the same';
    } else if(response instanceof HttpErrorResponse) {
      this.messageClass = 'text-danger';
      const errorMessages = response.error.errorMessages;
      this.message = this.sanitizer.bypassSecurityTrustHtml(
        errorMessages.join('<br>')
      );
    }
    this.dataService.disableLoading();
  }


  private validate(): boolean {
    this.messageClass = 'text-danger';

    if (Utils.validateStringIsEmpty(this.categoryDataService.selectedCategory.name!)) {
      this.message = 'The name is required';
      return false;
    }

    this.message = '';
    return true;
  }

  private reset(): void {
    this.categoryDataService.selectedCategory = {
      name: "",
      mediaUrl: ""
    };
  }
}
