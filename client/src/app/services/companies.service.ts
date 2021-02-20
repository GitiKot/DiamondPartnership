import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders}from '@angular/common/http'
import {  Observable } from 'rxjs';
import {Companies} from '../data/companies'
@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
Companies
  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  companiesUrl = 'http://localhost:3000/companies';
  constructor(private http: HttpClient) {
  }
  
  // getAllCompanies(): Observable<Companies[]> {
  //   return this.http.get<Companies[]>(this.companiesUrl);
  // } 

  addCompany(c:Companies):Observable<Companies>{

   return this.http.post<Companies>(this.companiesUrl,c);
  }
  updateCompany(cId, company: Companies):Observable<Companies>{

    const urlupdate = `${this.companiesUrl}/${cId}`;
    return this.http.patch<Companies>(urlupdate, company, this.options)
  }
  deleteCompany(c:Companies){
    var ttt=`${this.companiesUrl}/${c.id}`;
  
    return  this.http.delete<Companies>(ttt,this.options)
    .subscribe((c:Companies)=>{console.log(c,"suecces");
      },()=>{console.log("error");
      }
      );
    }
}

