import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChecksService {
  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  checksUrl = 'http://localhost:3000/checks';
  constructor(private http: HttpClient) { }

  // getAllExpenses(): Observable<Expenses[]> {
  //   return this.http.get<Expenses[]>(this.checksUrl);
  // }

  // addExpenses(e: Expenses): Observable<Expenses> {
  //   console.log("service", this.checksUrl);
  //   return this.http.post<Expenses>(this.checksUrl, e);
  // }

  // deleteExpenses(e: Expenses) {
  //   var ex = `${this.checksUrl}/${e.id}`;
  //   console.log("url=" + ex);

  //   return this.http.delete<Expenses>(ex, this.options)
  //     .subscribe((s: Expenses) => {
  //       console.log(s, "suecces");
  //     }, () => {
  //       console.log("error");
  //     }
  //     );

  // }
}
