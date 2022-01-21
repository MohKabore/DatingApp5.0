import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public accountService: AccountService, private toastr :ToastrService,
    private router: Router) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login() {
    this.accountService.login(this.model).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success('you\'are logged in');
        this.router.navigateByUrl('/members');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    this.accountService.logout();
    this.toastr.info('you\'re logout');
    this.router.navigateByUrl('');
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe((user) => {
    }, error => {
      console.log(error);

    });
  }
}
