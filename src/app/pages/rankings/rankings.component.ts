import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RankingsService } from '../../services/rankings.service';
import { TitleService } from '../../services/title.service';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss'],
})
export class RankingsComponent implements OnInit {
  public loading: boolean = false;
  public rankings: any[] = [];
  public champNames = new Map();
  public champions: any[] = [
    [
      {
        name: 'AEW World Championship',
        shortName: 'World',
        champion: null,
      },
      {
        name: 'AEW TNT Championship',
        shortName: 'TNT',
        champion: null,
      },
      {
        name: 'AEW International Championship',
        shortName: 'International',
        champion: null,
      },
      {
        name: 'AEW Continental Championship',
        shortName: 'Continental',
        champion: null,
      },
    ],
    [
      {
        name: "AEW Women's World Championship",
        shortName: 'World',
        champion: null,
      },
      { name: 'AEW TBS Championship', shortName: 'TBS', champion: null },
    ],
    [
      {
        name: 'AEW Tag Team Championship',
        shortName: 'World Tag Team',
        champion: [],
        championTeam: null,
      },
    ],
  ];
  constructor(
    private http: HttpClient,
    private rankingsService: RankingsService,
    private titleService: TitleService,
    private appComponent: AppComponent,
    private cdRef: ChangeDetectorRef
  ) {
    this.initialize();
    console.log(this.rankings);
  }

  initialize() {
    this.titleService.getAEWTitles().subscribe({
      next: (res: any) => {
        for (let title of res.data.titles) {
          for (let arr of this.champions) {
            for (let localTitle of arr) {
              var matchFound = false;
              if (localTitle.name == title.name) {
                if (
                  localTitle.shortName.includes('Tag') ||
                  localTitle.shortName.includes('Trios')
                ) {
                  localTitle.champion = title.currentChampion;
                  localTitle.championTeam = title.currentChampionTeam;
                } else {
                  localTitle.champion = title.currentChampion[0];
                }
                matchFound = true;
                break;
              }
              if (matchFound) {
                break;
              }
            }
          }
        }
        this.rankingsService.getMaleRankings().subscribe({
          next: (res: any) => {
            this.rankings.push(this.removeChampions(res.data.wrestlers, 4));
            this.rankingsService.getFemaleRankings().subscribe({
              next: (res: any) => {
                this.rankings.push(this.removeChampions(res.data.wrestlers, 2));
                this.rankingsService.getTeamRankings().subscribe({
                  next: (res: any) => {
                    this.rankings.push(this.removeChampions(res.data.team, 1));
                    // this.cdRef.detectChanges();
                    this.appComponent.loadingFalse();
                  },
                });
              },
            });
          },
        });
      },
    });
  }

  refreshRankings() {
    this.appComponent.loadingTrue();
    this.rankingsService.refreshRankings().subscribe({
      next: (res: any) => {
        this.rankings = [];
        this.initialize();
      },
    });
  }

  removeChampions(arr: any[], champCount: number) {
    var arrOut = [];
    for (let w of arr.slice(0, 50 + champCount)) {
      var matchFound = false;
      for (let arr of this.champions) {
        for (let localTitle of arr) {
          if (localTitle.champion.name == w.name) {
            matchFound = true;
            break;
          } else if (localTitle.championTeam) {
            if (localTitle.championTeam.name == w.name) {
              matchFound = true;
              break;
            }
          }
        }
        if (matchFound) {
          break;
        }
      }
      if (!matchFound) {
        arrOut.push(w);
      }
    }
    return arrOut;
  }

  test() {
    console.log(this.rankings[0][0].name);
  }

  ngOnInit(): void {}
}
