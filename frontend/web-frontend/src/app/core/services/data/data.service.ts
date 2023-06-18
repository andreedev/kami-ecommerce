import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  screenWidth: number = window.innerWidth

  //loading
  loading: boolean = false

  displayMobileMenu: boolean = false

  constructor() {
    this.screenWidth = window.innerWidth;
  }
  /* loading */
  enableLoading(): void {
    setTimeout(() => { this.loading = true }, 0)
  }
  disableLoading(): void {
    setTimeout(() => { this.loading = false }, 0)
  }

}
