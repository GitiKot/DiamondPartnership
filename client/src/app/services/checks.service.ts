import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Checks } from '../data/checks';

@Injectable({
  providedIn: 'root'
})
export class ChecksService {
  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  checksUrl = 'http://localhost:3000/checks';
  constructor(private http: HttpClient) { }

  getAllChecks(): Observable<Checks[]> {
    return this.http.get<Checks[]>(this.checksUrl);
  }

  addChecks(c: Checks): Observable<Checks> {
    console.log("service", this.checksUrl);
    return this.http.post<Checks>(this.checksUrl, c);
  }

  deleteChecks(c: Checks) {
    var ch = `${this.checksUrl}/${c.id}`;
    console.log("url=" + ch);

    return this.http.delete<Checks>(ch, this.options)
      .subscribe((c: Checks) => {
        console.log(c, "suecces");
      }, () => {
        console.log("error");
      }
      );

  }
}
