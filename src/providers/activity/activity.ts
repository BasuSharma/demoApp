import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { User } from '../../models/user';
 import {Headers, RequestOptions} from '@angular/http';
 
/*
  Generated class for the ActivityProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ActivityProvider {

	public serverUrl: string = 'http://205.147.102.105:9292';

  constructor(public http: Http) {
    console.log('Hello ActivityProvider Provider');
  }

   logUserActivity(data): Observable<User[]> {
   	 let headers = new Headers();
    headers.append('content-type', 'application/json');

    let options = new RequestOptions({headers: headers});
 	return this.http.post(`${this.serverUrl}/user_activity`, 
 		                        data, options).map(res => <User[]>res.json());
  }

 


}
