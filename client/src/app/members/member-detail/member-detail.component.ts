import { Message } from './../../_models/message';
import { MessageService } from './../../_services/message.service';
import { MembersService } from './../../_services/members.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member.model';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from '@kolkov/ngx-gallery';
import { strings as frenchStrings } from 'ngx-timeago/language-strings/fr';
import { TimeagoIntl } from 'ngx-timeago';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', {static:true}) memberTabs: TabsetComponent;
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab: TabDirective;
  messages: Message[] = [];

  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute,
    intl: TimeagoIntl,
    private msgService: MessageService
  ) {
    intl.strings = frenchStrings;
    intl.changes.next();
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.member =data.member);
    this.route.queryParams.subscribe(params => {
      params.tab ? this.selectTab(params.tab): this.selectTab(0);
    })
    const username = this.route.snapshot.paramMap.get('username');
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Fade,
        preview: false,
      },
    ];
    this.galleryImages = this.getImages();

  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      });
    }
    return imageUrls;
  }



  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.loadMessages();
    }
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active=true;
  }

  loadMessages() {
    this.msgService
      .getMessageThread(this.member.userName)
      .subscribe((messages) => {
        this.messages = messages;
      });
  }
}
