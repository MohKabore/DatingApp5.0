import { PresenceService } from './_services/presence.service';
import { AccountService } from './_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'the dating app';
  users: any[];
  constructor(private accountService: AccountService, private presenceService: PresenceService) {}
  ngOnInit(): void {
    this;this.setCurrentuser();
  }

  setCurrentuser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if(!!user) {
      this.accountService.setCurrentuser(user);
      this.presenceService.createHubConnection(user);
    }
  }

}
