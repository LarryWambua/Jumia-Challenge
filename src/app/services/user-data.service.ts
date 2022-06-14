import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  constructor( private http: HttpClient ) { }
  
    public getData( str:string ){
    return this.http.get('https://randomuser.me/api?'+str );
    }
  
    public exportCSV( str:string ){
      return this.http.get('https://randomuser.me/api/?results=25&format=csv&dl&'+str,{responseType: 'blob'});
      }
  
}
