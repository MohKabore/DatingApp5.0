import { NgForm } from '@angular/forms';
import { MessageService } from './../../_services/message.service';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/_models/message';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss'],
})
export class MemberMessagesComponent implements OnInit {
  @Input() username: string;
  @ViewChild('messageForm') messageForm: NgForm;
  messageContent: string;
  constructor(public msgService: MessageService) {}

  ngOnInit(): void {}

  sendMessage() {
    this.msgService
      .sendMessage(this.username, this.messageContent)
      .then(() => {
        this.messageForm.reset();
      });
  }
}
