import { Component, EventEmitter, Output } from '@angular/core';
import { Constants } from 'app/core/constants';
import { DataService } from 'app/core/services';
import { SearchDataService } from 'app/core/services/data/search-data.service';

@Component({
  selector: 'search-filters',
  templateUrl: './search-filters.component.html'
})
export class SearchFiltersComponent {
  readonly constants: typeof Constants = Constants;
  @Output() clearFiltersEventEmitter = new EventEmitter();
  @Output() applyFiltersEventEmitter = new EventEmitter();

  constructor(
    public dataService: DataService,
    public searchDataService: SearchDataService,
  ) { }
}
