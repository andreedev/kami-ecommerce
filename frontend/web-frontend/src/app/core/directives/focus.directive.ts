import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'input[appFocus]'
})
export class FocusDirective implements AfterViewInit {

  @Input('appFocus')
  public focused: boolean = false;

  constructor(public element: ElementRef<HTMLElement>) {
  }

  ngAfterViewInit(): void {
    // ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    if (this.focused) {
      setTimeout(() => this.element.nativeElement.focus(), 0);
    }
  }
}
