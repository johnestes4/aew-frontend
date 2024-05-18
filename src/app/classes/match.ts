import { Wrestler } from '../classes/wrestler';

export class Match {
  _id: string;
  winner: any[];
  result: string;
  loser: any[];
  time: string;
  matchType: string;
  title: any[];
  mainEvent: boolean;
  preshow: boolean;
  show: string;
  notes: string;

  constructor() {
    this._id = '0';
    this.winner = [new Wrestler()];
    this.result = '';
    this.loser = [[new Wrestler()]];
    this.time = '';
    this.matchType = '';
    this.title = [];
    this.mainEvent = false;
    this.preshow = false;
    this.show = '';
    this.notes = '';
  }
}
