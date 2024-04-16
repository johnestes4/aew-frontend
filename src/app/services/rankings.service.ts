import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import {map} from 'rxjs/operators'
// import { Observable } from 'rxjs/Observable'

// const dotenv = require('dotenv');
// //make sure to config dotenv BEFORE requiring app, that way the variables work everywhere
// dotenv.config({ path: '../config.env' });


@Injectable()
export class RankingsService {

  constructor(private http:HttpClient) {

  }

  getRankings(request: any) {
    this.http.get('localhost:3000/'+ 'rankings').pipe(map(responseData => {
      return responseData
    })).subscribe(rankings => {
      console.log(rankings)
    })
  }

  examplePostReq() {

  }

}
