export class Show {
  _id: string;
  name: string;
  date: Date;
  location: string;
  ppv: boolean;
  matches: any[];
  links: string[];
  notes: string;

  constructor() {
    this._id = '0';
    this.name = '';
    this.date = new Date();
    this.location = '';
    this.ppv = false;
    this.matches = [];
    this.links = [];
    this.notes = '';
  }
}
