import { Component, OnInit } from '@angular/core';
import { Wrestler } from '../../classes/wrestler';
import { Show } from '../../classes/show';
import { Match } from '../../classes/match';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WrestlerService } from '../../services/wrestlers.service';
import { RankingsService } from '../../services/rankings.service';
import { ShowService } from '../../services/show.service';
import { TitleService } from '../../services/title.service';
import { AuthService } from '../../services/auth.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  titles = [] as any;
  blankWrestler = new Wrestler();
  wrestlers = [] as Wrestler[];
  newWrestlers = [] as Wrestler[];
  activeWres = new Wrestler();
  activeWresUnchanged = new Wrestler();
  activeTab: number = 0;
  wresIndex: number = -1;
  nameEditOn: boolean = false;
  newShow: Show = new Show();
  authBlock = {
    password: '',
    url: window.location.href,
  };
  authorized: boolean = false;
  passRejected: boolean = false;
  confirmPopup: boolean = false;
  tvTypes: any[] = [
    {
      name: 'Dynamite',
      day: 3,
      ppv: false,
    },
    {
      name: 'Rampage',
      day: 5,
      ppv: false,
    },
    {
      name: 'Collision',
      day: 6,
      ppv: false,
    },
    {
      name: 'Battle of the Belts',
      day: 6,
      ppv: false,
    },
  ];

  //this needs to be one more array deep - gotta have a set for each match on the show
  whichNew: any[] = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private wrestlerService: WrestlerService,
    private showService: ShowService,
    private authService: AuthService,
    private rankingsService: RankingsService,
    public appComponent: AppComponent,
    private titleService: TitleService
  ) {
    this.login();
    // this.initialize();
  }
  ngOnInit(): void {}
  initialize() {
    this.appComponent.loadingTrue();

    this.wrestlerService.getAllWrestlers().subscribe({
      next: (res: any) => {
        this.wrestlers = res.data.wrestlers;
        this.titleService.getAEWTitles().subscribe({
          next: (res: any) => {
            for (let t of res.data.titles) {
              if (!t.name.includes('Interim')) {
                this.titles.push(t);
              }
            }
            // this.wrestlerService.getAllWrestlers().subscribe({
            //   next: (res: any) => {},
            // });
          },
        });
        this.addMatch();
        this.appComponent.loadingFalse();
      },
    });
  }
  trackByFn(index: any, item: any) {
    return index;
  }
  login() {
    // this.authBlock.url = 'No';
    this.authService.checkAuth(this.authBlock).subscribe({
      next: (res: any) => {
        if (res.data == true) {
          this.authorized = true;
          this.initialize();
        } else {
          if (this.authBlock.password.length > 0) {
            this.passRejected = true;
          }
        }
      },
    });
  }
  saveWrestler() {
    var newWrestler = new Wrestler();
    newWrestler.name = this.blankWrestler.name;
    newWrestler.nickname = this.blankWrestler.nickname;
    newWrestler.img =
      './assets/img/profiles/' + this.blankWrestler.img + '.png';
    this.blankWrestler = new Wrestler();
    this.wrestlers.push(newWrestler);
    console.log(this.wrestlers);
  }
  setActiveWres(wres: Wrestler, i: number) {
    console.log(wres.name);
    this.wresIndex = i;
    this.activeWres = JSON.parse(JSON.stringify(wres));
    this.activeWresUnchanged = JSON.parse(JSON.stringify(wres));
  }
  addAlias() {
    this.activeWres.aliases.push('');
  }
  removeAlias(i: number) {
    this.activeWres.aliases.splice(i, 1);
  }
  saveChanges(i: number) {
    // console.log(this.activeWres.aliases)
    this.wrestlerService
      .updateWrestler(this.authBlock, this.activeWres)
      .subscribe({
        next: (res: any) => {
          this.wrestlers[i] = JSON.parse(JSON.stringify(this.activeWres));
        },
      });
  }
  discardChanges() {
    this.activeWres = JSON.parse(JSON.stringify(this.activeWresUnchanged));
  }
  addMatch() {
    var newMatch: Match = new Match();
    newMatch.winner[0] = this.wrestlers[0].name;
    newMatch.loser[0][0] = this.wrestlers[0].name;
    this.whichNew.push([[null], [[null]]]);
    this.newShow.matches.push(newMatch);
  }
  addWinner(matchI: number, match: Match) {
    match.winner.push(this.wrestlers[0].name);
    this.whichNew[matchI][0].push(null);
  }
  removeWinner(matchI: number, match: any, wI: number) {
    match.winner.splice(wI, 1);
    this.whichNew[matchI][0].splice(wI, 1);
  }
  addLoserSide(matchI: number, match: Match) {
    match.loser.push([this.wrestlers[0].name]);
    this.whichNew[matchI][1].push([null]);
  }
  removeLoserSide(matchI: number, match: any, sideI: number) {
    match.loser.splice(sideI, 1);
    this.whichNew[matchI][1].splice(sideI, 1);
  }
  addLoser(matchI: number, side: any[], loserI: number) {
    side.push(this.wrestlers[0].name);
    this.whichNew[matchI][1][loserI].push(null);
  }
  removeLoser(matchI: number, match: any, sideI: number, wI: number) {
    match.loser[sideI].splice(wI, 1);
    this.whichNew[matchI][1][sideI].splice(wI, 1);
  }

  toggleWrestler(matchI: number, arrI: number, wresI: number, sideI?: number) {
    console.log(`${matchI} | ${arrI} | ${wresI} | ${sideI}`);
    console.log(this.whichNew);
    if (sideI !== undefined) {
      if (this.whichNew[matchI][arrI][sideI][wresI] === null) {
        this.whichNew[matchI][arrI][sideI][wresI] = '';
      } else {
        this.whichNew[matchI][arrI][sideI][wresI] = null;
      }
    } else {
      if (this.whichNew[matchI][arrI][wresI] === null) {
        this.whichNew[matchI][arrI][wresI] = '';
      } else {
        this.whichNew[matchI][arrI][wresI] = null;
      }
    }
  }

  saveShow(show: Show) {
    this.appComponent.loadingTrue();
    for (let i = 0; i < show.matches.length; i++) {
      for (let i2 = 0; i2 < this.whichNew[i][0].length; i2++) {
        if (this.whichNew[i][0][i2] !== null) {
          show.matches[i].winner[i2] = this.whichNew[i][0][i2];
        }
      }
      for (let i2 = 0; i2 < this.whichNew[i][1].length; i2++) {
        //i-1-i2 is a side. the i3 is the wrestler within the side. keep it straight somehow
        for (let i3 = 0; i3 < this.whichNew[i][1][i2].length; i3++) {
          if (this.whichNew[i][1][i2][i3] !== null) {
            show.matches[i].loser[i2][i3] = this.whichNew[i][1][i2][i3];
          }
        }
      }
    }
    this.showService.createShow(this.authBlock, show).subscribe({
      next: (res: any) => {
        this.newShow = new Show();
        this.addMatch();
        this.appComponent.loadingFalse();
        console.log(res);
      },
    });
  }

  refreshRankings() {
    this.appComponent.loadingTrue();
    this.rankingsService.refreshRankings(this.authBlock).subscribe({
      next: (res: any) => {
        console.log('Rankings Updated');
        this.appComponent.loadingFalse();
      },
    });
  }

  // searchWrestler(element) {}
}
