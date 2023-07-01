import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Utils } from 'app/core/helpers/utils';
import { CategoryService, DataService } from 'app/core/services';
import { CategoryDataService } from 'app/core/services/data/category-data.service';

@Component({
  selector: 'category-delete',
  templateUrl: './category-delete.component.html'
})
export class CategoryDeleteComponent {
  //validate
  message: SafeHtml = '';
  messageClass: string = '';
  displayCategoryInfo: boolean = true

  constructor(
    public categoryDataService: CategoryDataService,
    public dataService: DataService,
    private categoryService: CategoryService,
    private sanitizer: DomSanitizer
  ) { }


  async delete(): Promise<void> {
    if (!this.validate()) return;
    this.dataService.enableLoading();
    const response: any = await this.categoryService.deleteCategory(this.categoryDataService.selectedCategory);
    if (response === 1) {
      this.messageClass = 'text-red';
      this.message = 'Deleted successfully';
      this.reset();
      this.categoryDataService.dataUpdatedEvent.emit()
      setTimeout(() => {
        this.categoryDataService.displayCategoryDeleteModal = false
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

    if (Utils.stringIsEmpty(this.categoryDataService.selectedCategory.name!)) {
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
