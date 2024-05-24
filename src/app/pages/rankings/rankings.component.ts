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
  public date: String = '';
  public months = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  public whichTab: Number = 0;
  public infoRead: boolean = false;
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
    this.rankingsService.getAllRankings().subscribe({
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
        var date = new Date(res.data.date);
        this.date =
          this.months[date.getMonth()] +
          ' ' +
          date.getUTCDate() +
          ', ' +
          date.getFullYear();
        this.rankings.push(this.removeChampions(res.data.male, 4));
        this.rankings.push(this.removeChampions(res.data.female, 2));
        this.rankings.push(this.removeChampions(res.data.tag, 1));
        console.log(this.rankings);
        this.appComponent.loadingFalse();
      },
    });
  }

  removeChampions(arr: any[], champCount: number) {
    var arrOut = [];
    for (let w of arr.slice(0, 10 + champCount)) {
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
