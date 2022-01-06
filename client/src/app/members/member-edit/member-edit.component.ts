import { ToastrService } from 'ngx-toastr';
import { Member } from './../../_models/member.model';
import { User } from './../../_models/user.model';
import { MembersService } from './../../_services/members.service';
import { AccountService } from './../../_services/account.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { TimeagoIntl } from 'ngx-timeago';
import {strings as frenchStrings} from 'ngx-timeago/language-strings/fr';


@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  member: Member;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastService: ToastrService,
    intl: TimeagoIntl
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
      intl.strings = frenchStrings;
    intl.changes.next();
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(): void {
    this.memberService
      .getMember(this.user.username)
      .subscribe((member) => (this.member = member));
  }

  updateMember() {
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastService.success('profile updated successfully...');
      this.editForm.reset(this.member);
    });
  }
}
