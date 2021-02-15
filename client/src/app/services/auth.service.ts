import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../data/user';

// const AUTH_API = 'http://localhost:3000/api/auth';
const AUTH_API = 'http://localhost:3000/user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      userName: credentials.userName,
      password: credentials.password
    }, httpOptions);
  }



  addUser(user: User): Observable<User> {
    console.log("adduser", user);
    console.log("auth_api", AUTH_API);
    return this.http.post<User>(AUTH_API, user);

  }

  register(user): Observable<any> {
    console.log("register auth", user);
    console.log("api", AUTH_API);
    return this.http.post<User>(AUTH_API, user);
    // return this.http.post(AUTH_API, {
    //   userName: user.userName,
    //   email: user.email,
    //   password: user.password
    // });
  }
}