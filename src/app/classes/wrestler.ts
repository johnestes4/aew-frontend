export class Wrestler {
  _id: string;
  name: string;
  img: string;
  nickname: string;
  aliases: string[];
  allElite: boolean;
  forbiddenDoor: boolean;
  male: boolean;
  power: Number;
  powerHistory: any[];
  moves: string[];
  team: string;
  faction: string;
  titles: any[];
  boosts: any[];
  profileImage: string;
  alumni: boolean;

  constructor() {
    this._id = '0';
    this.name = '';
    this.img = '';
    this.nickname = '';
    this.aliases = [];
    this.allElite = false;
    this.forbiddenDoor = false;
    this.male = true;
    this.power = 0;
    this.powerHistory = [];
    this.moves = [];
    this.team = '';
    this.faction = '';
    this.titles = [];
    this.boosts = [];
    this.profileImage = '';
    this.alumni = false;
  }
}
