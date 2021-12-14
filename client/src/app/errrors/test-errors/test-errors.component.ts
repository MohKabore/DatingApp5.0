import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss']
})
export class TestErrorsComponent implements OnInit {
  validationErrors : string[]=[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  get4O4error() {
    this.http.get('https://localhost:5001/api/buggy/not-found')
                .subscribe(response => console.log(response),
                            error => console.log(error));
  }

  get4O0error() {
    this.http.get('https://localhost:5001/api/buggy/bad-request')
                .subscribe(response => console.log(response),
                            error => console.log(error));
  }

  get4O1error() {
    this.http.get('https://localhost:5001/api/buggy/auth')
                .subscribe(response => console.log(response),
                            error => console.log(error));
  }

  get500error() {
    this.http.get('https://localhost:5001/api/buggy/server-error')
                .subscribe(response => console.log(response),
                            error => console.log(error));
  }

  get4O0ValidationError() {
    this.http.post('https://localhost:5001/api/account/register',{})
                .subscribe(response => console.log(response),
                            error => {
                              console.log(error);
                              this.validationErrors =error;
                            });
  }

}
