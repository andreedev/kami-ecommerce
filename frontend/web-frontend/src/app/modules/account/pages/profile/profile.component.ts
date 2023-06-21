import { Component } from '@angular/core';
import { AuthDataService } from 'app/core/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {

  constructor(
    public authDataService: AuthDataService,
  ) { }

  getDocumentTypeLabel(documentType: any): string {
    switch (documentType) {
      case 1:
        return 'DNI';
      case 4:
        return 'CARNET EXT.';
      case 6:
        return 'RUC';
      case 8:
        return 'PASAPORTE';
      default:
        return '-';
    }
  }
  

}
