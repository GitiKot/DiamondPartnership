import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seriousness } from '../data/seriousness'
@Injectable({
  providedIn: 'root'
})
export class seriousnessService {

  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  seriousnessUrl = 'http://localhost:3000/seriousness';
  seriousnessList: Array <Seriousness>
  constructor(private http: HttpClient) { 
    this.getAllSeriousness().subscribe(ans => { this.seriousnessList = ans 
      console.log(this.seriousnessList);
      
      })  
  }
  getAllSeriousness(): Observable<Seriousness[]> {
    return this.http.get<Seriousness[]>(this.seriousnessUrl);
  }

  addSeria(s: Seriousness): Observable<Seriousness> { 
    s.amountReceived = 0;
    s.AmountReceivedPartner = 0
    return this.http.post<Seriousness>(this.seriousnessUrl, s);
  }
  deleteSeria(s: Seriousness) {
    var urldeleteSeria = `${this.seriousnessUrl}/${s.id}`;
    return this.http.delete<Seriousness>(urldeleteSeria, this.options)
      .subscribe((s: Seriousness) => {
        console.log(s, "suecces");
      }, () => {
        console.log("error");
      }
      );
  }
  updateSerial(sId:string,serial: Seriousness):Observable<Seriousness> {
    const urlupdate = `${this.seriousnessUrl}/${sId}`;
    console.log(serial);
    
    return this.http.patch<Seriousness>(urlupdate, serial, this.options);  
  }
  
  findBySerailName(serialName: string):Observable<Seriousness> {
    const urlFindBy = `${this.seriousnessUrl}/${serialName}`;
    console.log(urlFindBy);
    return this.http.get<Seriousness>(urlFindBy)
  }
}
