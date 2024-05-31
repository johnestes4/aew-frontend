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
export class AuthService {
  constructor(private http: HttpClient) {}
  checkAuth(authBlock: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth', authBlock).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
