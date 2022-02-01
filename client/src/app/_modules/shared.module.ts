import { FileUploadModule } from 'ng2-file-upload';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule} from "ngx-bootstrap/datepicker";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago';
import {  TimeagoIntl, TimeagoFormatter, TimeagoCustomFormatter } from 'ngx-timeago';
import { NgChartsModule } from 'ng2-charts';



export class MyIntl extends TimeagoIntl {
  // do extra stuff here...
  }


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    NgChartsModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    TimeagoModule.forRoot(
      {
        intl: { provide: TimeagoIntl, useClass: MyIntl },
        formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
      }
    ),
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    }),
    NgxGalleryModule,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports:[
    BsDropdownModule,
    ToastrModule,
    NgChartsModule,
    TabsModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule,
    TimeagoModule,
    ModalModule
  ]
})
export class SharedModule { }
