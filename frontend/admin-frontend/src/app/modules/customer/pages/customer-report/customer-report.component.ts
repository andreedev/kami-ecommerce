import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'app/core/helpers/utils';
import { Address, DynamicReport } from 'app/core/models';
import { Customer } from 'app/core/models/customer';
import { CustomerDataService, CustomerService, DataService } from 'app/core/services';
import moment from 'moment';
import { AppRoutes } from 'app/core/constants/app-routes';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'customer-report',
  templateUrl: './customer-report.component.html',
  providers: [MessageService]
})
export class CustomerReportComponent{
  query: string = '';
  loading: boolean = true;
  statusFilter: number | null = null;
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
    public customerService: CustomerService,
    public customerDataService: CustomerDataService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  async getReport(e: any = null): Promise<void> {
    const dateFilter = {
      startDate: Utils.formatDate(this.dateFilter.startDate),
      endDate: Utils.formatDate(this.dateFilter.endDate)
    }
    this.dataService.enableLoading();
    this.loading = true;
    const response: any = await this.customerService.report(this.query, this.currentPage, this.statusFilter, dateFilter);
    if (response instanceof HttpErrorResponse) {
      if (response.status === 401) {
        this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME]);
        return;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal error' });
        this.dataService.disableLoading();
      }
    }if (response!.data.length !== 0) {
      this.customersList = response!.data;
      this.loading = false;
      Utils.generatePagesUIArray(response!.totalPages, this.currentPage);
    }
    this.dataService.disableLoading();
  }


  updatePage(page: number): void {
    this.currentPage = page;
    this.getReport();
  }

  viewAddresses(addresses: Address[]): void {
    this.customerDataService.addresses = addresses;
    this.customerDataService.displayAddressesModal = true;
  }

}
