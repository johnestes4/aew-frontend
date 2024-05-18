import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wrestler } from '../classes/wrestler';
// import { Rankings } from './rankings.model' //use this eventually if you make an explicit model for the rankings
// import { Observable } from 'rxjs/Observable'

// const dotenv = require('dotenv');
// //make sure to config dotenv BEFORE requiring app, that way the variables work everywhere
// dotenv.config({ path: '../config.env' });

@Injectable({ providedIn: 'root' })
export class WrestlerService {
  constructor(private http: HttpClient) {}

  updateRankings() {}

  getWrestler(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/api/' + 'wrestlers/' + id).pipe(
      map((responseData) => {
        return responseData;
      })
    );
  }

  getAllWrestlers(): Observable<any> {
    return this.http.get('http://localhost:3000/api/' + 'wrestlers').pipe(
      map((responseData) => {
        return responseData;
      })
    );
  }

  updateWrestler(wres: Wrestler): Observable<any> {
    return this.http
      .patch('http://localhost:3000/api/' + 'wrestlers/' + wres._id, wres)
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }

  getRankings(): Observable<any> {
    return this.http
      .get('http://localhost:3000/api/' + 'wrestlers/rankings')
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }

  examplePostReq() {}
}
