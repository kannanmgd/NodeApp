import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<{token: string}>('http://localhost:8000/api/login', {userName: username, passWord: password})
    .pipe(
      map(result => {
        localStorage.setItem('access_token', result.token);
        const timeToLogin = Date.now() + 300000;
        localStorage.setItem('timer', JSON.stringify(timeToLogin));
        return result;
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('timer');
  }

  public get loggedIn() {
    return (localStorage.getItem('access_token') !== null);
  }

}
