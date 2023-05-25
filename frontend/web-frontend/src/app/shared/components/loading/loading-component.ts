import { Component } from '@angular/core';
import { DataService } from 'app/core/services/data.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading-component.html'
})
export class LoadingComponent{

  constructor(public dataService: DataService) { }

}
