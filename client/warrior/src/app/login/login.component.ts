import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

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
  }

}
