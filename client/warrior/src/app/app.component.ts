import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {}
  title = 'warrior';
  isDashboard: any;

  ngOnInit() {
    // this.sessionHandles();
  }

  // logout() {
  //   this.auth.logout();
  //   this.router.navigate(['login']);
  // }

  // sessionHandles() {
  //   const timer = JSON.parse(localStorage.getItem('timer'));
  //   const token = JSON.parse(localStorage.getItem('access_token'));
  //   if (timer && (Date.now() > timer)) {
  //     this.logout();
  //   }
  //   if (!token) {
  //     this.logout();
  //   }
  // }

}
