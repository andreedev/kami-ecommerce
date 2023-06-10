import { Component } from '@angular/core';
import { DataService } from 'app/core/services';
import { ProductModalDataService } from 'app/core/services/data/product-modal-data.service';

@Component({
  selector: 'product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent {
  constructor(
    public productModalDataService: ProductModalDataService,
    public dataService: DataService
  ) { }
}
