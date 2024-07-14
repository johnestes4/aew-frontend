import { Component } from '@angular/core';
import { Router, NavigationEnd, UrlTree } from '@angular/router';
import { AppService } from './services/app.service';
import { GtagAPIService } from '@bloomscorp/ngx-gtag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public loading: Boolean = false;
  public infoRead: boolean = false;
  public dropdown: Boolean = false;

  constructor(private router: Router, gtag: GtagAPIService) {
    if (localStorage.getItem('infoRead') == 'true') {
      this.infoRead = true;
    }
  }

  iAccept(which: boolean) {
    localStorage.setItem('infoRead', 'true');
    this.infoRead = which;
  }

  public loadingTrue() {
    this.loading = true;
  }

  public loadingFalse() {
    this.loading = false;
  }
  public goTo(destination: string) {
    this.router.navigateByUrl(this.router.parseUrl(destination));
  }
  ngOnInit() {}
}
