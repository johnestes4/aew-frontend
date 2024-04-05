import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wresprofile',
  templateUrl: './wresprofile.component.html',
  styleUrls: ['./wresprofile.component.scss']
})
export class WresprofileComponent implements OnInit {

  currentWres: any = {
    name: "Chuck Taylor",
    nickname: "The Kentucky Gentleman",
    team: "Best Friends",
    record: [
      {
        win: true,
        opp: {
          name: "Chaos Project",
          partners: ["Luther","Serpentico"]
        },
        team: {
          name: "Best Friends",
          partners: ["Orange Cassidy"]
        }
      },
      {
        win: true,
        opp: {
          name: "Hardy Family Office",
          partners: ['Marq Quen','Isiah Kassidy','Jora Johl']
        },
        team: {
          name: "Best Friends",
          partners: ["Orange Cassidy",'Wheeler Yuta']
        }
      },
      {
        win: false,
        opp: {
          name: 'The Blade'
        }
      },
      {
        win: true,
        opp: {
          name: 'Dan Barry'
        }
      },
      {
        win: true,
        opp: {
          name: 'Aaron Rourke'
        }
      },
      {
        win: true,
        opp: {
          name: 'Vary Morales'
        }
      },
      {
        win: false,
        opp: {
          name: 'Rey Fenix'
        }
      }
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
