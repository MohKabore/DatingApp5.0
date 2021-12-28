import { MembersService } from './../../_services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member.model';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions,NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    username && this.loadMember(username);
    this.galleryOptions = [
      {
        width:'500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation: NgxGalleryAnimation.Fade,
        preview:false
      }
    ]

  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push(
        {
          small:photo?.url,
          medium:photo?.url,
          big:photo?.url
        }
      )
    }
    return imageUrls;
  }

  loadMember(username: string) {
    this.memberService.getMember(username).subscribe(member => {
      this.member =member;
      this.galleryImages = this.getImages();

    });
  }

}
