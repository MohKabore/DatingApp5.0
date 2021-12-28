import { Observable, of } from 'rxjs';
import { Member } from './../_models/member.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {tap } from 'rxjs/operators';


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
  members: Member[]=[];

  constructor(private http: HttpClient) { }

  getMembers(): Observable<Member[]>{
    if(this.members.length>0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl+'users').pipe(
      tap(members => this.members = members)
    );
  }
  getMember(username: string): Observable<Member>{
    var member = this.members.find(member => member.userName ===username);
    if(member!==undefined) return of(member);
    return this.http.get<Member>(this.baseUrl+'users/getUser/'+username);
  }

  updateMember(member:Member) {
    return this.http.put(this.baseUrl+'users', member).pipe(
      tap(() => {
        const index = this.members.indexOf(member);
        this.members[index]=member;
      })
    );
  }
}
