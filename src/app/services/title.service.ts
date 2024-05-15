import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Titles } from './rankings.model' //use this eventually if you make an explicit model for the rankings
// import { Observable } from 'rxjs/Observable'

// const dotenv = require('dotenv');
// //make sure to config dotenv BEFORE requiring app, that way the variables work everywhere
// dotenv.config({ path: '../config.env' });

@Injectable({ providedIn: 'root' })
export class TitleService {
  constructor(private http: HttpClient) {}

  updateTitles() {}

  getAllTitles(): Observable<any> {
    return this.http.get('http://localhost:3000/api/titles').pipe(
      map((res) => {
        return res;
      })
    );
  }

  getAEWTitles(): Observable<any> {
    return this.http.get('http://localhost:3000/api/titles?promotion=AEW').pipe(
      map((res) => {
        return res;
      })
    );
  }

  examplePostReq() {}
}
