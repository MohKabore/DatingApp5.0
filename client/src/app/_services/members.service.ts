import { Observable } from 'rxjs';
import { Member } from './../_models/member.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


// const httpOptions ={
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("user"))?.token
//   })
// }


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private baseUrl =  environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers(): Observable<Member[]>{
    return this.http.get<Member[]>(this.baseUrl+'users');
  }
  getMember(username: string): Observable<Member>{
    return this.http.get<Member>(this.baseUrl+'users/getUser/'+username);
  }
}
