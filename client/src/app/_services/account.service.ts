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
  constructor(private http: HttpClient) {}

  login(model: any) {
    const url = 'https://localhost:5001/api/account/login';
    //const url =this.baseUrl+="account/login";
    return this.http.post<User>(url, model).pipe(
      tap((user: User) => {
        this.setCurrentuser(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentuserSource.next(null);
  }

  setCurrentuser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentuserSource.next(user);
  }

  register(model) {
    const url = 'https://localhost:5001/api/account/register';
    return this.http.post(url, model).pipe(
      tap((user: User) => {
        this.setCurrentuser(user);
      })
    );
  }
}
