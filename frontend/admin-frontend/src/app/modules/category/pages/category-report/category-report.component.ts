import { Component } from '@angular/core';
import { Utils } from 'app/core/helpers/utils';
import { Category, DynamicReport } from 'app/core/models';
import { DataService } from 'app/core/services';
import { CategoryService } from 'app/core/services/category.service';

@Component({
  selector: 'app-category-report',
  templateUrl: './category-report.component.html'
})
export class CategoryReportComponent {
  query: string = '';
  loading: boolean = true;

  categoryList!: Category[];
  selectedCategory: Category | undefined;

  currentPage: number = 1;
  totalPages: number = 1;

  uiPaginationArray: any[] = [];

  constructor(
    public dataService: DataService,
    public categoryService: CategoryService
  ) { }

  async ngOnInit() {
    this.getReport()
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
  

  updatePage(page: number): void {
    this.currentPage = page;
    this.getReport();
  }
}
