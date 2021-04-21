import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { Expenses } from '../data/expenses';


@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  expensesUrl = 'http://localhost:3000/expenses';
  expensesList: Array <Expenses>
  constructor(private http: HttpClient) { 
    this.getAllExpenses().subscribe(ans => { this.expensesList = ans 
      console.log(this.expensesList);
      
      })  
  }

  getAllExpenses(): Observable<Expenses[]> {
    return this.http.get<Expenses[]>(this.expensesUrl);
  }

  addExpenses(e: Expenses): Observable<Expenses> {
    console.log("service", this.expensesUrl);
    return this.http.post<Expenses>(this.expensesUrl, e);
  }
  updateExpenses(exId, expenses: Expenses):Observable<Expenses> {
    
    const urlupdate = `${this.expensesUrl}/${exId}`;
    return this.http.patch<Expenses>(urlupdate, expenses, this.options);
  }
  deleteExpenses(e: Expenses) {
    var ex = `${this.expensesUrl}/${e.id}`;
    console.log("url=" + ex);

    return this.http.delete<Expenses>(ex, this.options)
      .subscribe((s: Expenses) => {
        console.log(s, "suecces");
      }, () => {
        console.log("error");
      }
      );

  }
}
