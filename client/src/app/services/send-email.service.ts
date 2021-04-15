import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Email} from '../data/Email'
@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  emailUrl = 'http://localhost:3000/sendEmail';
  constructor(private http: HttpClient) { }

  getAllEmail(): Observable<Email[]> {
    return this.http.get<Email[]>(this.emailUrl);
  }
  
  sendEmail(e :Email): Observable<Email> {
    console.log(e,"email");
    console.log(this.emailUrl);
    
    return this.http.post<Email>(this.emailUrl, e);
  }
  
 
}
