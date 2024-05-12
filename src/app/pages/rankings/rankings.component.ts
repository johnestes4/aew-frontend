import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RankingsService } from '../../services/rankings.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss'],
})
export class RankingsComponent implements OnInit {
  private loading: boolean = false;
  public rankings: any;
  constructor(
    private http: HttpClient,
    private rankingsService: RankingsService
  ) {
    this.rankingsService.getAllRankings().subscribe({
      next: (res: any) => {
        this.rankings = res.data.wrestlers.slice(0, 100);
      },
    });
    console.log(this.rankings);
  }

  test() {
    console.log(this.rankings[0].name);
  }

  ngOnInit(): void {}
}
