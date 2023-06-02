import { Component, OnInit } from '@angular/core';
import { Utils } from 'app/core/helpers/utils';
import { DynamicReport, Employee } from 'app/core/models';
import { Customer } from 'app/core/models/customer';
import { DataService } from 'app/core/services';
import { CustomerService } from 'app/core/services/customer.service';
import moment from 'moment';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html'
})
export class CustomerReportComponent implements OnInit {
  query: string = '';
  loading: boolean = true;
  statusFilter: number|null=null;
  dateFilter: { startDate: any, endDate: any } = {
    startDate: moment().subtract(1, 'months'),
    endDate: moment(),
  };
  maxDate: any
   = moment().format('YYYY-MM-DD');

  customersList: Array<Customer> | undefined;
  selectedCustomer: Customer | undefined;

  currentPage: number = 1;
  totalPages: number = 1;

  uiPaginationArray: any[] = [];

  constructor(
    public dataService: DataService,
    public customerService: CustomerService
  ) { }

  async ngOnInit() {
    
  }

  async getReport(e:any=null): Promise<void>{
    const dateFilter = {
      startDate: Utils.prepareDateToSendBack(this.dateFilter.startDate),
      endDate: Utils.prepareDateToSendBack(this.dateFilter.endDate)
    }
    this.dataService.enableLoading();
    this.loading=true;
    const response: DynamicReport<Employee> | null = await this.customerService.customerReport(this.query, this.currentPage, this.statusFilter, dateFilter);
    if (response!.data.length!==0) {
      this.customersList=response!.data;
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
