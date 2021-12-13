import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  constructor() {}

  ngOnInit(): void {}

  registerToglle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegister(event : boolean) {
    this.registerMode = event;
  }


}
