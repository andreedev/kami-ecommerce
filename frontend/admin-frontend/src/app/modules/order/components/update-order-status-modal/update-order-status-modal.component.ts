import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService, OrderDataService, OrderService } from 'app/core/services';
import { OrderStatus } from 'app/core/enums/order-status';
import { Utils } from 'app/core/helpers/utils';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'update-order-status-modal',
  templateUrl: './update-order-status-modal.component.html',
  providers: [MessageService]
})
export class UpdateOrderStatusModalComponent implements OnInit {
  readonly OrderStatus = OrderStatus;
  readonly Utils = Utils;

  @Output() refreshReport = new EventEmitter<any>(); 

  message: SafeHtml = '';
  messageClass: string = '';

  constructor(
    public dataService: DataService,
    public orderDataService: OrderDataService,
    public orderService: OrderService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const currentStatus = this.orderDataService.updateOrderStatusRequest.currentStatus;
    if (currentStatus===OrderStatus.PAYMENT_IN_PROCESS.getCode()){
      this.orderDataService.updateOrderStatusRequest.newStatus = OrderStatus.PAYMENT_CONFIRMED.getCode();

    } else if (currentStatus===OrderStatus.PAYMENT_CONFIRMED.getCode()){
      this.orderDataService.updateOrderStatusRequest.newStatus = OrderStatus.SHIPPED.getCode();

    } else if (currentStatus===OrderStatus.SHIPPED.getCode()){
      this.orderDataService.updateOrderStatusRequest.newStatus = OrderStatus.DELIVERED.getCode();
    }
  }

  async updateOrderStatus(): Promise<void> {
    if (!this.validate()) return;
    this.dataService.enableLoading();
    const response: any = await this.orderService.updateOrderStatus(this.orderDataService.updateOrderStatusRequest);
    if (response instanceof HttpErrorResponse) {
      this.messageClass = 'text-red';
      this.message = 'Internal error';
    } else if (response.code === 1) {
      this.orderDataService.resetUpdateOrderStatusRequest();
      this.refreshReport.emit();
      this.orderDataService.displayUpdateOrderStatusModal = false;
    } else if (response.code === 0) {
      this.messageClass = 'text-red';
      this.message = 'Error at updating the order status';
    }
    this.dataService.disableLoading();
  }


  private validate(): boolean {
    this.messageClass = 'text-red';

    if (Utils.stringIsEmpty(this.orderDataService.updateOrderStatusRequest.totalPaid)) {
      this.message = 'The total paid is required';
      return false;
    }

    if (!Utils.validatePrice(this.orderDataService.updateOrderStatusRequest.totalPaid)) {
      this.message = 'Invalid total paid value (i.g: 9.50, 1.00, 2)';
      return false;
    }

    this.message = '';
    return true;
  }

  
  
}
