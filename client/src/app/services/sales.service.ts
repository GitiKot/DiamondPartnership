import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders}from '@angular/common/http'
import { from, Observable } from 'rxjs';
import {Sale} from '../data/sale'
@Injectable({
  providedIn: 'root'
})
export class SalesService {
  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
 salesUrl = 'http://localhost:3000/sales';
  constructor(private http: HttpClient) { } 
  
  
  getAllSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.salesUrl);
  } 

  addSale(s:Sale):Observable<Sale>{
    console.log("service", this.salesUrl);

   return this.http.post<Sale>(this.salesUrl,s);
  }
}




  
 
 

