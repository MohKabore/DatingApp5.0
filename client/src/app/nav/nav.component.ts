import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public accountService: AccountService, private toastr :ToastrService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login() {
    this.accountService.login(this.model).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success('you\'are logged in');
      },
      (error) => {
        this.toastr.error(error.error);
        console.log(error);
      }
    );
  }

  logout() {
    this.accountService.logout();
    this.toastr.info('you\'re logout');
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe((user) => {
    }, error => {
      console.log(error);

    });
  }
}
