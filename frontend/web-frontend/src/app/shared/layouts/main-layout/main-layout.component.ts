import { Component, HostListener, OnInit } from '@angular/core';

import { DataService } from 'app/core/services/data/data.service';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.dataService.screenWidth = event.target.innerWidth
  }

}
