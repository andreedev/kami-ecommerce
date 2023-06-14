import { NgModule } from '@angular/core';
import { DsctoPipe } from './pipes/dscto.pipe';
import { FocusDirective } from './directives/focus.directive';

@NgModule({
  declarations: [
    DsctoPipe,
    FocusDirective
  ],
  imports: [
  ],
  exports: [
    DsctoPipe,
    FocusDirective
  ]
})
export class CoreModule {}
