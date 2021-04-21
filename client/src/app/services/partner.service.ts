import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders}from '@angular/common/http'
import {  Observable } from 'rxjs';
import {Partner} from '../data/partner'

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  partnerUrl = 'http://localhost:3000/partners'; 
   partnerList: Array <Partner>

  constructor(private http: HttpClient) {
    
     this.getAllPartners().subscribe(ans => { this.partnerList = ans 
    console.log(this.partnerList);
    
    })  

  }
  

  getAllPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.partnerUrl);
  } 

  addPartner(p:Partner):Observable<Partner>{

   return this.http.post<Partner>(this.partnerUrl,p);
  }
  updatePartner(pId, partner: Partner):Observable<Partner>{

    const urlupdate = `${this.partnerUrl}/${pId}`;
    return this.http.patch<Partner>(urlupdate, partner, this.options)
  }
  deletePartner(p:Partner){
    var ttt=`${this.partnerUrl}/${p.id}`;
  
    return  this.http.delete<Partner>(ttt,this.options)
    .subscribe((p:Partner)=>{console.log(p,"suecces");
      },()=>{console.log("error");
      }
      );
    
    }
}
