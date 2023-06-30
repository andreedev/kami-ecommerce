import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { Product } from 'app/core/models/product';
import { DataService, ProductService } from 'app/core/services';
// @ts-ignore
import * as moment from 'moment';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html'
})
export class ProductCreateComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;

  product: Product = {
    isAvailable: true,
    name: '',
    sku: '',
    price: 0.00,
    discount: undefined,
    brand: '',
    categories: [],
    specifications: [],
    mediaUrls: [],
    keywords: '',
    stock: 0
  };

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


  async create(): Promise<void> {
    if (!this.validate()) return;
    this.dataService.enableLoading();
    const response: any = await this.productService.createProduct(this.product);
    if (response instanceof HttpErrorResponse) {
      if (response.status === 400) {
        this.messageClass = 'text-red';
        const errorMessages = response.error.errorMessages;
        this.message = this.sanitizer.bypassSecurityTrustHtml(
          errorMessages.join('<br>')
        );
      } else {
        this.messageClass = 'text-red';
        this.message = 'Internal error'
      }
    } else if (response === null) {
      this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME]);
    } else if (response === 1) {
      this.messageClass = 'text-green';
      this.message = 'Product created successfully';
      this.reset();
      setTimeout(() => {
        this.router.navigate([AppRoutes.PRODUCT_REPORT_COMPONENT_ROUTE_NAME]);
      }, 1500);
    }
    this.dataService.disableLoading();
  }


  private validate(): boolean {
    this.messageClass = 'text-danger';

    if (Utils.stringIsEmpty(this.product.name!)) {
      this.message = 'The name is required';
      return false;
    }

    if (Utils.stringIsEmpty(this.product.sku!)) {
      this.message = 'The sku is required';
      return false;
    }

    if (Utils.stringIsEmpty(this.product.brand!)) {
      this.message = 'The brand is required';
      return false;
    }

    if (this.product.discount !== undefined) {
      if (!Utils.validatePercentage(this.product.discount!.percentage!)) {
        this.message = 'Percentage must be between 1 and 100';
        return false;
      }

      this.product.discount.startDate = this.dateRange.startDate.format("YYYY-MM-DD HH:mm:ss");
      this.product.discount.endDate = this.dateRange.endDate.format("YYYY-MM-DD HH:mm:ss")
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


    if (!Utils.validateNumberIsGreaterOrEqualThan(this.product.stock, 0)) {
      this.message = 'Invalid stock';
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

  private reset(): void {
    this.product = {
      name: '',
      sku: '',
      price: 0.00,
      discount: undefined,
      brand: '',
      categories: [],
      specifications: [],
      mediaUrls: [],
      keywords: '',
      stock: 0
    };
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


}
