import { Component, Input } from '@angular/core';
import { Product } from 'app/core/models';
import { DataService } from 'app/core/services';

@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent {
  @Input() product!: Product;

  constructor(
    public dataService: DataService,
  ) { }
}
