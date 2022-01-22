import { PresenceService } from './presence.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { User } from '../_models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl: 'https://localhost:5001/api/';
  private currentuserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentuserSource.asObservable();
  constructor(private http: HttpClient, private presenceService: PresenceService) {}

  login(model: any) {
    const url = 'https://localhost:5001/api/account/login';
    //const url =this.baseUrl+="account/login";
    return this.http.post<User>(url, model).pipe(
      tap((user: User) => {
        this.setCurrentuser(user);
        this.presenceService.createHubConnection(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentuserSource.next(null);
    this.presenceService.stopHubConnection();
  }

  setCurrentuser(user: User) {
    user.roles=[];
    const roles = this.getDecodeToken(user.token).role;
    Array.isArray(roles)? user.roles=roles: user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentuserSource.next(user);

  }

  register(model) {
    const url = 'https://localhost:5001/api/account/register';
    return this.http.post(url, model).pipe(
      tap((user: User) => {
        this.setCurrentuser(user);
        this.presenceService.createHubConnection(user);
      })
    );
  }

  getDecodeToken(token) {
    return JSON.parse(atob(token.split('.')[1]))
  }
}
