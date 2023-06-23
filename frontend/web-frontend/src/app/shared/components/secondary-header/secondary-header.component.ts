import { Component } from '@angular/core';
import { AppRoutes } from 'app/core/constants';
import { Location } from '@angular/common';

@Component({
  selector: 'secondary-header',
  templateUrl: './secondary-header.component.html'
})
export class SecondaryHeaderComponent {
  readonly appRoutes: typeof AppRoutes = AppRoutes;

  constructor(
    private location: Location
  ) { }

  goBack(): void {
    this.location.back();
  }
}
