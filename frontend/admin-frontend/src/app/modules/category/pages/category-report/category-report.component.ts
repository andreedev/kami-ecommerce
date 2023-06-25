import { Component } from '@angular/core';
import { Utils } from 'app/core/helpers/utils';
import { Category, DynamicReport } from 'app/core/models';
import { DataService } from 'app/core/services';
import { CategoryService } from 'app/core/services/api/category.service';
import { CategoryDataService } from 'app/core/services/data/category-data.service';

@Component({
  selector: 'app-category-report',
  templateUrl: './category-report.component.html'
})
export class CategoryReportComponent {
  query: string = '';
  loading: boolean = true;

  categoryList!: Category[];

  currentPage: number = 1;
  totalPages: number = 1;

  uiPaginationArray: any[] = [];

  constructor(
    public dataService: DataService,
    public categoryDataService: CategoryDataService,
    private categoryService: CategoryService
  ) { }

  async ngOnInit() {
    this.getReport()
    this.categoryDataService.dataUpdatedEvent.subscribe(() => {
      this.getReport()
    });
  }

  async getReport(e:any=null): Promise<void>{
    this.dataService.enableLoading();
    this.loading=true;
    const response: DynamicReport<Category> | null = await this.categoryService.categoryReport(this.query, this.currentPage);
    if (response!.data.length!==0) {
      this.categoryList=response!.data;
      this.loading=false;
      Utils.generatePagesUIArray(response!.totalPages, this.currentPage);
    }
    this.dataService.disableLoading();
  }

  update(category: Category): void{
    this.categoryDataService.selectedCategory = category
    this.categoryDataService.displayCategoryUpdateModal = true
  }
  
  delete(category: Category): void{
    this.categoryDataService.selectedCategory = category
    this.categoryDataService.displayCategoryDeleteModal = true
  }

  updatePage(page: number): void {
    this.currentPage = page;
    this.getReport();
  }
}
