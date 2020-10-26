import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { Expenses } from '../data/expenses';


@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  expensesrUrl = 'http://localhost:3000/expenses';
  constructor(private http: HttpClient) { }

  getAllExpenses(): Observable<Expenses[]> {
    return this.http.get<Expenses[]>(this.expensesrUrl);
  }
  addExpenses(e: Expenses): Observable<Expenses> {
    console.log("service", this.expensesrUrl);

    return this.http.post<Expenses>(this.expensesrUrl, e);
  }
}
