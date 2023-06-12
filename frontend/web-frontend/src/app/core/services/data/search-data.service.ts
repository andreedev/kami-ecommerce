import { Injectable } from '@angular/core';
import { Constants } from 'app/core/constants';
import { SearchRequest, DynamicReport, Product } from 'app/core/models';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {

  searchRequest: SearchRequest = {
    query: "",
    onSaleFilter: false,
    page: 1,
    orderFilter: 1,
    categoriesFilter: [],
    inStockFilter: false,
    brand: undefined,
    maxPriceFilter: Constants.PRODUCT_MAX_PRICE
  }

  searchResults: DynamicReport<Product> = {
    data: [],
    totalPages: 0
  }

  searchRequestLoading: boolean = false

  constructor() { }

  applyCategoryFilter(categoryName: string | undefined, event?: any):void{
    if (!categoryName){
      this.searchRequest.categoriesFilter = []
      return;
    }
    this.searchRequest.categoriesFilter = [categoryName]
  }
}
