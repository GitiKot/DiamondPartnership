import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Sale } from '../data/sale'
@Injectable({
  providedIn: 'root'
})
export class SalesService {
  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  salesUrl = 'http://localhost:3000/sales';
  OpenSalesList:Array<Sale>;
  ClosedSalesList:Array<Sale>;
  saleList: Array <Sale>
     
  constructor(private http: HttpClient) { 
   this.OpenSalesList=[];
   this.ClosedSalesList=[];
   
  }
 

  getAllSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.salesUrl);
  }

  findBySerailName(serialName: string):Observable<Sale[]> {
    const urlFindBy = `${this.salesUrl}/${serialName}`;
    return this.http.get<Sale[]>(urlFindBy)
  }
//בשביל מחוק את זה צריך למחוק גם מהשקים
  findAllSales(pn: string): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.salesUrl);
  }
  addSale(s: Sale): Observable<Sale> {
  
    return this.http.post<Sale>(this.salesUrl, s);
  }
  updateSale(saleId, sale: Sale) :Observable<Sale>{

    const urlupdate = `${this.salesUrl}/${saleId}`;
    return this.http.patch<Sale>(urlupdate, sale, this.options)
 
  }

 
  deleteSale(s: Sale) :Observable<Sale>{
    var ttt = `${this.salesUrl}/${s.id}`;

    return this.http.delete<Sale>(ttt, this.options);
  }
}








