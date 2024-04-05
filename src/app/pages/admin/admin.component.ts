import { Component, OnInit } from '@angular/core';
import { Wrestler } from '../../classes/wrestler';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  blankWrestler = new Wrestler
  wrestlers = [] as Wrestler[]
  constructor() { }
  saveWrestler() {
    var newWrestler = new Wrestler
    newWrestler.name = this.blankWrestler.name
    newWrestler.nickname = this.blankWrestler.nickname
    newWrestler.img = './assets/img/profiles/'+this.blankWrestler.img+'.png'
    this.blankWrestler = new Wrestler
    this.wrestlers.push(newWrestler)
    console.log(this.wrestlers)
  }
  ngOnInit(): void {
  }

}
