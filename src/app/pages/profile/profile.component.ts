import { Component, OnInit } from '@angular/core';
import { Wrestler } from '../../classes/wrestler';
import { WrestlerService } from '../../services/wrestlers.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentWres: Wrestler = new Wrestler();

  constructor(
    private http: HttpClient,
    private wrestlerService: WrestlerService,
    private route: ActivatedRoute,
    private router: Router,
    public nav: AppComponent
  ) {
    console.log(this.route.snapshot.params.id);
    this.initialize();
  }

  initialize() {
    this.wrestlerService.getWrestler(this.route.snapshot.params.id).subscribe({
      next: (res: any) => {
        this.currentWres = res.data.wrestler;
      },
    });
  }

  ngOnInit(): void {}
}
