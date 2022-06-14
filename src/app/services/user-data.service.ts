import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  constructor( private http: HttpClient ) { }
  
    public getData( str:string ){
    return this.http.get('https://randomuser.me/api?'+str );
    }

    public getDataNew(str: any): Observable<any> {
      return this.http.get<any>('https://randomuser.me/api?'+str);
    }
}
