import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
})
export class ModalDialogComponent implements OnInit {
  title: string;
  message: string;
  btnOkText: string;
  btnCancelText: string;
  result: boolean;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}
  confirm() {
    this.result = true;
    this.bsModalRef.hide();

  }
  decline() {
    this.result = false;
    this.bsModalRef.hide();

  }
}
