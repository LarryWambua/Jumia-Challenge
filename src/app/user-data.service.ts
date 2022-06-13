import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  constructor( private http: HttpClient ) { }
  
    public getData( str:string ){
    return this.http.get('https://randomuser.me/api?'+str );
    }
}
