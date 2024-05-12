import { Component, OnInit } from '@angular/core';
import { Wrestler } from '../../classes/wrestler';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WrestlerService } from '../../services/wrestlers.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  blankWrestler = new Wrestler();
  wrestlers = [] as Wrestler[];
  activeWres = new Wrestler();
  activeWresUnchanged = new Wrestler();
  activeTab: number = 0;
  wresIndex: number = -1;
  nameEditOn: boolean = false;
  constructor(
    private http: HttpClient,
    private wrestlerService: WrestlerService
  ) {
    this.wrestlerService.getAllWrestlers().subscribe({
      next: (res: any) => {
        this.wrestlers = res.data.wrestlers;
      },
    });
  }
  trackByFn(index: any, item: any) {
    return index;
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
    this.wrestlerService.updateWrestler(this.activeWres).subscribe({
      next: (res: any) => {
        this.wrestlers[i] = JSON.parse(JSON.stringify(this.activeWres));
      },
    });
  }
  discardChanges() {
    this.activeWres = JSON.parse(JSON.stringify(this.activeWresUnchanged));
  }
  ngOnInit(): void {}
}
