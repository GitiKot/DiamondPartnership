import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from './../data/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  salesUrl = 'http://localhost:3000/users';
 
  constructor(private http: HttpClient) { }
  allowingAccess(u:User):Observable<User>{  
    console.log("שלום מסרויס קליינט");
    
      return this.http.post<User>(this.salesUrl, u);
  }

  returnSign(u:User){
    console.log(this.allowingAccess(u).subscribe(a=>{
      console.log("a " ,a);
      
    }));
    
  }
}
