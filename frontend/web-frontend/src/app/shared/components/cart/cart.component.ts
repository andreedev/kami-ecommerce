import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'app/core/services';
import { environment } from 'assets/environments/environment';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  readonly resourcesUrl: string = environment.resourcesUrl;

  constructor(
    public dataService: DataService,
    private router: Router
  ) { }
}
