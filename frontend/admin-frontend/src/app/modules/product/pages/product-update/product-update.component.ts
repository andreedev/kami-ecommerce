import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { Product } from 'app/core/models/product';
import { ProductService, DataService } from 'app/core/services';
import * as moment from 'moment';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {

  product!: Product

  dateRange: any = {
    startDate: moment(),
    endDate: moment().add(1, 'days'),
  }
  categoriesForm: FormGroup;
  specificationsForm: FormGroup;
  mediaUrlsForm: FormGroup;

  //validate
  message: SafeHtml = '';
  messageClass: string = '';

  discountCheckbox: boolean = false;

  constructor(
    private productService: ProductService,
    public dataService: DataService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.categoriesForm = new FormGroup({
      values: new FormControl<string[] | null>(null)
    });
    this.specificationsForm = new FormGroup({
      values: new FormControl<string[] | null>(null)
    });
    this.mediaUrlsForm = new FormGroup({
      values: new FormControl<string[] | null>(null)
    });
    this.categoriesForm.valueChanges.subscribe(() => {
      this.product.categories = this.categoriesForm.get('values')?.value;
    });
    this.specificationsForm.valueChanges.subscribe(() => {
      this.product.specifications = this.specificationsForm.get('values')?.value;
    });
    this.mediaUrlsForm.valueChanges.subscribe(() => {
      this.product.mediaUrls = this.mediaUrlsForm.get('values')?.value;
    });
  }

  ngOnInit(): void {
    if (!this.dataService.selectedProduct) {
      this.router.navigate([AppRoutes.PRODUCT_REPORT_COMPONENT_ROUTE_NAME]);
      return;
    }
    this.product = this.dataService.selectedProduct;
    if (this.product.discount) this.discountCheckbox = true;
    this.categoriesForm.setValue({
      values: this.product.categories
    });
    this.specificationsForm.setValue({
      values: this.product.specifications
    });
    this.mediaUrlsForm.setValue({
      values: this.product.mediaUrls
    });
  }

  async update(): Promise<void> {
    if (!this.validate()) return;
    this.dataService.enableLoading();
    const response: any = await this.productService.updateProduct(this.product);
    if (response===1) {
      this.messageClass = 'text-green';
      this.message = 'Product update successfully';
      setTimeout(() => {
        this.router.navigate([AppRoutes.PRODUCT_REPORT_COMPONENT_ROUTE_NAME]);
      }, 1000);
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

    if (Utils.validateStringIsEmpty(this.product.name!)) {
      this.message = 'The name is required';
      return false;
    }

    if (Utils.validateStringIsEmpty(this.product.sku!)) {
      this.message = 'The sku is required';
      return false;
    }

    if (Utils.validateStringIsEmpty(this.product.brand!)) {
      this.message = 'The brand is required';
      return false;
    }

    if (this.product.discount !== undefined) {
      if (!Utils.validatePercentage(this.product.discount!.percentage!)) {
        this.message = 'Percentage must be between 1 and 100';
        return false;
      }
      this.product.discount.startDate = Utils.prepareDateTimeToSendBack(this.dateRange.startDate)
      this.product.discount.endDate = Utils.prepareDateTimeToSendBack(this.dateRange.endDate)
    }


    if (this.product.categories!.length == 0) {
      this.message = 'The categories list is required';
      return false;
    }

    if (this.product.specifications!.length == 0) {
      this.message = 'The specifications list is required';
      return false;
    }

    if (this.product.mediaUrls!.length == 0) {
      this.message = 'The mediaUrls list is required';
      return false;
    }

    if (!Utils.validatePrice(this.product.price!)) {
      this.message = 'Invalid price (i.g: 9.50, 1.00, 2)';
      return false;
    }


    if (!Utils.validateNumberIsPositive(this.product.stock)) {
      this.message = 'The stock is required and must be at least 1';
      return false;
    }

    this.message = '';
    return true;
  }

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    if (checked) this.product.discount = {
      percentage: '1'
    }
    else this.product.discount = undefined;
  }


  addCategory(str: string): void {
    this.product.categories!.push(str.trim());
  }

  addSpecification(str: string): void {
    this.product.specifications!.push(str.trim());
  }

  addMediaUrl(str: string): void {
    this.product.mediaUrls!.push(str.trim());
  }


  debug(): void {
    console.log(this.product);
  }

}
