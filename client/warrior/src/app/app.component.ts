import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  title = 'warrior';

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    const resUrl = 'http://localhost:8000/api/users';
    this.http.get(resUrl).subscribe(data => {
      console.log(data);
    });
  }

  login() {
    this.router.navigate(['/login']);
  }
}
