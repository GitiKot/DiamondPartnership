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
    
    return this.http.get<Seriousness[]>(this.seriousnessUrl);

  }

  addSeria(s: Seriousness): Observable<Seriousness> {
    
    s.amountReceived = 0;
    s.AmountReceivedPartner = 0;

    return this.http.post<Seriousness>(this.seriousnessUrl, s);
  }
  deleteSeria(s: Seriousness) {
    var ttt = `${this.seriousnessUrl}/${s.id}`;

    return this.http.delete<Seriousness>(ttt, this.options)
      .subscribe((s: Seriousness) => {
        console.log(s, "suecces");
      }, () => {
        console.log("error");
      }
      );
  }
  updateSerial(sId:string,serial: Seriousness):Observable<Seriousness> {

    const urlupdate = `${this.seriousnessUrl}/${sId}`;
 
    return this.http.patch<Seriousness>(urlupdate, serial, this.options);
    
  }
  
  findBySerailName(serialName: string):Observable<Seriousness> {
    const urlFindBy = `${this.seriousnessUrl}/${serialName}`;
    console.log(urlFindBy);
    
    return this.http.get<Seriousness>(urlFindBy)
  }
}
