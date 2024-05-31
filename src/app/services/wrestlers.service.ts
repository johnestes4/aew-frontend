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
    return this.http.get(environment.apiUrl + 'wrestlers/' + id).pipe(
      map((responseData) => {
        return responseData;
      })
    );
  }

  getAllWrestlers(): Observable<any> {
    return this.http.get(environment.apiUrl + 'wrestlers').pipe(
      map((responseData) => {
        return responseData;
      })
    );
  }

  updateWrestler(authBlock: any, wres: Wrestler): Observable<any> {
    var dataSend = {
      password: authBlock.password,
      url: authBlock.url,
      wres: wres,
    };
    return this.http
      .patch(environment.apiUrl + 'wrestlers/' + wres._id, dataSend)
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }

  getRankings(): Observable<any> {
    return this.http.get(environment.apiUrl + 'wrestlers/rankings').pipe(
      map((responseData) => {
        return responseData;
      })
    );
  }

  examplePostReq() {}
}
