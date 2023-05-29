import { Component } from '@angular/core';
import { DataService } from 'app/core/services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

  constructor(
    public dataService: DataService,
  ) { }
}
