import { Injectable } from '@angular/core';
import { environment } from 'assets/environments/environment';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  stompClient: any;
  isOpen: boolean = false;

  dataSubject: Subject<any> = new Subject<any>();

  constructor() {
    this.init();
  }

  private init(): void {
    const socket = new SockJS(`${environment.websocketUrl}`);
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = () => { }
    this.stompClient.heartbeat.outgoing = 5000;
    this.stompClient.heartbeat.incoming = 5000;
    this.stompClient.connect({}, (frame: any) => {
      this.isOpen = true;
    }, this.errorCallBack);
  }

  connect(url: string): void {
    if (!this.isOpen) {
      setTimeout(() => {
        this.connect(url);
      }, 100);
    } else {
      this.stompClient.subscribe(`/app-out/${url}`, (res: any) => {
        this.dataSubject.next(res.body);
      });
    }
  }

  subscribeToData(): Observable<any> {
    return this.dataSubject.asObservable();
  }


  errorCallBack(error: any) {
    console.log("errorCallBack: " + error)
    this.isOpen = false;
    // setTimeout(() => {
    //   this.init();
    // }, 5000);
  }

  bit(): void {
    // this.stompClient.subscribe('/app-out/bit', (res: any) => {
    //   console.log('data : ', res.body);
    // });
  }

}
