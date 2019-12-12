import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;
  isRegister: any = false;
  isLogin: any = true;
  registerForm: FormGroup;
  hide = true;
  regStatus: any = {};
  successScreen: any = false;
  isValidcustomer: any;
  public error: string;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.isLogin = true;
    this.loginform = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
    this.isRegister = true;
    this.isLogin = false;
  }
  login() {
    this.isRegister = false;
    this.isLogin = true;
    this.successScreen = false;
  }

  isFieldValid(field): boolean {
    return ((!this.loginform.get(field).valid && this.loginform.get(field).touched) ||
      (this.loginform.get(field).untouched));
  }
  isFieldValidRegister(field): boolean {
    return ((!this.registerForm.get(field).valid && this.registerForm.get(field).touched) ||
      (this.registerForm.get(field).untouched));
  }
  onRegister() {
    const formval = this.registerForm.value;
    this.isRegister = false;
    this.http.post('http://localhost:8000/api/register', formval).subscribe(response => {
      this.regStatus = response;
      if (this.regStatus.val === 'Success') {
        this.successScreen = true;
      }
    });
    this.registerForm.reset();
  }

  onSubmit() {
    const formval = this.loginform.value;
    const username = formval.userName;
    const password = formval.password;
    // this.http.post('http://localhost:8000/api/login', formval).subscribe(res => {
    //   this.isValidcustomer = res;
    //   if (this.isValidcustomer.val === 'success') {
    //     this.router.navigate(['/dashboard']);
    //   }
    // });
    this.auth.login(username, password)
    .pipe(first())
    .subscribe(
      result => this.router.navigate(['/dashboard']),
      err => this.error = 'errorororrh'
    );
  }

}
