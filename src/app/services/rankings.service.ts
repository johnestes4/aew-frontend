import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Rankings } from './rankings.model' //use this eventually if you make an explicit model for the rankings
// import { Observable } from 'rxjs/Observable'

// const dotenv = require('dotenv');
// //make sure to config dotenv BEFORE requiring app, that way the variables work everywhere
// dotenv.config({ path: '../config.env' });

@Injectable({ providedIn: 'root' })
export class RankingsService {
  constructor(private http: HttpClient) {}

  updateRankings() {}

  getAllRankings(): Observable<any> {
    return this.http.get('http://localhost:3000/api/rankings').pipe(
      map((res) => {
        return res;
      })
    );
  }

  getMaleRankings(max: number): Observable<any> {
    return this.http
      .get('http://localhost:3000/api/wrestlers/rankings/male')
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getFemaleRankings(max: number): Observable<any> {
    return this.http
      .get('http://localhost:3000/api/wrestlers/rankings/female')
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getTeamRankings(max: number): Observable<any> {
    return this.http.get('http://localhost:3000/api/teams/rankings/male').pipe(
      map((res) => {
        return res;
      })
    );
  }

  refreshRankings(authBlock: any): Observable<any> {
    return this.http
      .post('http://localhost:3000/api/rankings/calc', authBlock)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  examplePostReq() {}
}
