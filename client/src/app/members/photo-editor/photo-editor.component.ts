import { MembersService } from './../../_services/members.service';
import { take } from 'rxjs/operators';
import { AccountService } from './../../_services/account.service';
import { User } from './../../_models/user.model';
import { environment } from './../../../environments/environment';
import { Member } from './../../_models/member.model';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/photo.model';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;
  constructor(
    private accountService: AccountService,
    private memeberService: MembersService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.memeberService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.accountService.setCurrentuser(this.user);
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p => {
        if(p.isMain) p.isMain=false;
        if(p.id === photo.id) p.isMain=true;
      })
    });
  }

  deletePhoto(photoId: number) {
    this.memeberService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter(photo => photo.id !== photoId);
    })
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, header) => {
      if (response) {
        const photo: Photo = JSON.parse(response);
        if(photo.isMain) {
          this.member.photoUrl = photo.url;
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentuser(this.user);
        }
        this.member.photos.push(photo);
      }
    };
  }
}
