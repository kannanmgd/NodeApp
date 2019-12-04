import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loginform = this.fb.group({
      userName: ['', Validators.required]
    });
  }

}
