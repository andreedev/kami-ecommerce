import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { Order, Product } from 'app/core/models';
import { DataService, OrderDataService, OrderService } from 'app/core/services';
import moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'order-report',
  templateUrl: './order-report.component.html',
  providers: [MessageService]
})
export class OrderReportComponent implements OnInit {
  readonly appRoutes: typeof AppRoutes = AppRoutes;
  readonly utils: typeof Utils = Utils;

  query: string = '';
  loading: boolean = true;
  statusFilter: string = '';
  dateFilter: { startDate: any, endDate: any } = {
    startDate: moment().subtract(1, 'months'),
    endDate: moment(),
  };
  maxDate: any
    = moment().format('YYYY-MM-DD');

  list: Order[] = [];
  selected: Order | undefined;

  currentPage: number = 1;
  totalPages: number = 1;

  uiPaginationArray: any[] = [];

  constructor(
    public dataService: DataService,
    public orderService: OrderService,
    private router: Router,
    private messageService: MessageService,
    public orderDataService: OrderDataService
  ) { }

  ngOnInit() {
    this.dataService.selectedProduct = undefined
  }

  async report(e: any = null): Promise<void> {
    const dateFilter = {
      startDate: Utils.formatDate(this.dateFilter.startDate),
      endDate: Utils.formatDate(this.dateFilter.endDate)
    }
    this.dataService.enableLoading();
    this.loading = true;
    const response = await this.orderService.report(this.query, this.currentPage, this.statusFilter, dateFilter);
    console.log(response);
    if (response instanceof HttpErrorResponse) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal error' });
    } else if (response === null) {
      this.router.navigate([AppRoutes.LOGIN_COMPONENT_ROUTE_NAME]);
    } else if (response.data.length !== 0) {
      this.list = response.data;
      this.loading = false;
      Utils.generatePagesUIArray(response.totalPages, this.currentPage);
    }
    this.dataService.disableLoading();
  }


  updatePage(page: number): void {
    this.currentPage = page;
    this.report();
  }


  update(item: any): void {

  }

  viewProducts(list: Product[]): void {
    this.orderDataService.orderProducts = list;
    this.orderDataService.displayOrderProductsModal = true;
  }
}
