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
  public rankings: any[] = [];
  public champNames = new Map();
  public champions: any[] = [
    [
      {
        name: 'AEW World Championship',
        shortName: 'World',
        champion: null,
        defenses: 0,
      },
      {
        name: 'AEW TNT Championship',
        shortName: 'TNT',
        champion: null,
        defenses: 0,
      },
      {
        name: 'AEW International Championship',
        shortName: 'International',
        champion: null,
        defenses: 0,
      },
      {
        name: 'AEW Continental Championship',
        shortName: 'Continental',
        champion: null,
        defenses: 0,
      },
    ],
    [
      {
        name: "AEW Women's World Championship",
        shortName: 'World',
        champion: null,
        defenses: 0,
      },
      {
        name: 'AEW TBS Championship',
        shortName: 'TBS',
        champion: null,
        defenses: 0,
      },
    ],
    [
      {
        name: 'AEW Tag Team Championship',
        shortName: 'World Tag Team',
        champion: [],
        championTeam: null,
        defenses: 0,
      },
    ],
  ];
  public dateObj: Date = new Date();
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
  public recordToggles = [
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ];
  public isExpanded = [
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ];
  public championExpanded = [0, 0, 0];
  public championRecordToggles = [false, false, false];
  public expandableChampions = [];
  constructor(
    private http: HttpClient,
    private rankingsService: RankingsService,
    private titleService: TitleService,
    public appComponent: AppComponent,
    private cdRef: ChangeDetectorRef
  ) {
    this.initialize();
  }

  initialize() {
    this.appComponent.loadingTrue();
    this.rankingsService.getAllRankings().subscribe({
      next: (res: any) => {
        for (let title of res.data.titles) {
          for (let arr of this.champions) {
            for (let localTitle of arr) {
              var matchFound = false;
              if (
                title.currentChampion.length < 1 &&
                !title.currentChampionTeam
              ) {
                title.currentChampion.push({
                  name: 'Vacant',
                  power: 0,
                  profileImage: './assets/img/profile/vacant.jpg',
                });
              }
              if (localTitle.name == title.name) {
                if (
                  localTitle.shortName.includes('Tag') ||
                  localTitle.shortName.includes('Trios')
                ) {
                  localTitle.champion = title.currentChampion;
                  localTitle.championTeam = title.currentChampionTeam;
                  localTitle.defenses =
                    title.reigns[title.reigns.length - 1].defenses.length - 1;
                } else {
                  localTitle.champion = title.currentChampion[0];
                  localTitle.champion.profileImage =
                    localTitle.champion.profileImage.slice(
                      0,
                      localTitle.champion.profileImage.indexOf('.jpg')
                    ) +
                    '_' +
                    localTitle.shortName.toLowerCase() +
                    localTitle.champion.profileImage.slice(
                      localTitle.champion.profileImage.indexOf('.jpg')
                    );
                  localTitle.defenses =
                    title.reigns[title.reigns.length - 1].defenses.length - 1;
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
        console.log(this.champions);
        var date = new Date(res.data.date);
        this.dateObj = date;
        // console.log(date);
        this.date =
          this.months[date.getUTCMonth() + 1] +
          ' ' +
          date.getUTCDate() +
          ', ' +
          date.getFullYear();
        this.rankings.push(this.removeChampions(res.data.male, 4));
        this.rankings.push(this.removeChampions(res.data.female, 2));
        this.rankings.push(this.removeChampions(res.data.tag, 1));
        // console.log(this.rankings);
        this.appComponent.loadingFalse();
      },
    });
  }

  getChampForExpansion(colI: number) {
    if (colI < 2) {
      return this.champions[colI][this.championExpanded[colI]].champion;
    } else {
      return this.champions[colI][this.championExpanded[colI]].championTeam;
    }
  }

  getDateGap(date: Date) {
    var date2 = new Date(date);
    const diffTime = this.dateObj.getTime() - date2.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
    return arrOut.slice(0, 10);
  }

  test() {
    console.log(this.rankings[0][0].name);
  }

  ngOnInit(): void {}
}
