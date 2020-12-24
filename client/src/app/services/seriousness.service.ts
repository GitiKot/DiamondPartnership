import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Seriousness } from '../data/seriousness'
@Injectable({
  providedIn: 'root'
})
export class seriousnessService {

  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  seriousnessUrl = 'http://localhost:3000/seriousness';
  constructor(private http: HttpClient) { }


  getAllSeriousness(): Observable<Seriousness[]> {
    console.log("now");
    
    return this.http.get<Seriousness[]>(this.seriousnessUrl);

  }

  addSeria(s: Seriousness): Observable<Seriousness> {
    console.log("serial" + s);
    s.amountReceived = 0;
    s.AmountReceivedPartner = 0;
    console.log("service", this.seriousnessUrl);

    return this.http.post<Seriousness>(this.seriousnessUrl, s);
  }
  deleteSeria(s: Seriousness) {
    var ttt = `${this.seriousnessUrl}/${s.id}`;
    console.log("url=" + ttt);

    return this.http.delete<Seriousness>(ttt, this.options)
      .subscribe((s: Seriousness) => {
        console.log(s, "suecces");
      }, () => {
        console.log("error");
      }
      );
  }
  updateSerial(serial: Seriousness) {
    console.log("update");

    const urlupdate = `${this.seriousnessUrl}/${serial.id}`;
    // return this.http.put<Sale>(fullUrl, sale, this.options);
    return this.http.patch<Seriousness>(urlupdate, serial, this.options)
    .subscribe((s: Seriousness) => {
      console.log(s, "suecces");
    }, () => {
      console.log("error");
    }
    );
  }
}
