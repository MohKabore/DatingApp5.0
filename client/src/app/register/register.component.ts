import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm :FormGroup;
  maxDate : Date;
  validationErrors: string[]=[];

  constructor(private accountService: AccountService,private router: Router,
     private toastr: ToastrService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }

  matchValues(mathTo: string): ValidatorFn{
    return (control: AbstractControl) => {
      return control?.value ===control?.parent?.controls[mathTo].value? null : { isMatching: true};
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(response =>
      {
        this.router.navigateByUrl('/members');
      }, error => {
        this.validationErrors = error;
      });

  }

  initializeForm() {
    this.registerForm= this.fb.group({
    gender: ['male', ],
    username: ['', Validators.required],
    knownAs: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    password: ['', [Validators.required,Validators.minLength(4), Validators.maxLength(8)]],
    confirmPassword:['', [Validators.required,this.matchValues('password')]]
    })
    this.registerForm.controls.password.valueChanges.subscribe(()=> {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
