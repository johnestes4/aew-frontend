import { Directive, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Directive({
  selector: '[routerLink]',
})
export class RouterLinkDirective extends RouterLink {
  @HostListener('mouseup', ['$event'])
  triggerCustomClick(ev: MouseEvent) {
    if (this.urlTree !== null) {
      if (ev.button === 1 || (ev.ctrlKey && ev.button === 0)) {
        window.open(this.urlTree.toString(), '_blank');
      }
    }
  }
  // Preventing the default scroll by movement
  @HostListener('mousedown', ['$event'])
  preventMiddleClickScroll(ev: MouseEvent) {
    if (ev.button === 1) {
      ev.preventDefault();
    }
  }
}
