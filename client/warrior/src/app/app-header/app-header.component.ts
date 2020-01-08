import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.sessionHandles();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  sessionHandles() {
    const timer = JSON.parse(localStorage.getItem('timer'));
    const token = JSON.parse(localStorage.getItem('access_token'));
    if (timer && (Date.now() > timer)) {
      this.logout();
    }
    if (!token) {
      this.logout();
    }
  }

}
