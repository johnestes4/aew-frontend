import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Show } from '../classes/show';
// import { Titles } from './rankings.model' //use this eventually if you make an explicit model for the rankings
// import { Observable } from 'rxjs/Observable'

// const dotenv = require('dotenv');
// //make sure to config dotenv BEFORE requiring app, that way the variables work everywhere
// dotenv.config({ path: '../config.env' });

@Injectable({ providedIn: 'root' })
export class ShowService {
  constructor(private http: HttpClient) {}

  createShow(authBlock: any, show: Show): Observable<any> {
    var dataSend = {
      password: authBlock.password,
      url: authBlock.url,
      show: show,
    };

    return this.http.post(environment.apiUrl + 'shows/new', dataSend).pipe(
      map((responseData) => {
        return responseData;
      })
    );
  }
}
