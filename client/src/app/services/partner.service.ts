import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders}from '@angular/common/http'
import { from, Observable } from 'rxjs';
import {Partner} from '../data/partner'



@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  partnerUrl = 'http://localhost:3000/partners';
  constructor(private http: HttpClient) {
  }
  
  getAllPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.partnerUrl);
  } 

  addPartner(p:Partner):Observable<Partner>{
    console.log("service", this.partnerUrl);

   return this.http.post<Partner>(this.partnerUrl,p);
  }
 
}
