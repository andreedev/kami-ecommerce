import { Component } from '@angular/core';
import { DataService } from 'app/core/services/data/data.service';

@Component({
  selector: 'loading',
  templateUrl: './loading-component.html'
})
export class LoadingComponent {

  constructor(public dataService: DataService) { }

}
