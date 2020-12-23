import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import{Seriousness} from 'src/app/data/seriousness'
import{seriousnessService} from 'src/app/services/seriousness.service'
@Component({
  selector: 'app-seriousness',
  templateUrl: './seriousness.component.html',
  styleUrls: ['./seriousness.component.css'],
})
export class SeriousnessComponent implements OnInit {
  @ViewChild('frame2') frame2: ModalDirective;
indexSerial:number;
currectSeria:Seriousness;
  constructor(private seriousnessService:seriousnessService,private r:Router) { }

  
seriousnessList:Array<Seriousness>
  ngOnInit(): void {

    this.seriousnessService.getAllSeriousness().subscribe(ans => {this.seriousnessList = ans});

  }
 
  cancel() {
    console.log("ertyui");
    
    this.r.navigate(['/seriousness']);
  }

  filterNameSeria() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("public");
    filter = input.value.toUpperCase();
    table = document.getElementById("seriuosnessTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  toolbar(i: number) {

    let row = document.getElementById("row" + i);
    let del = document.getElementById("del" + i);

    row.style.borderColor = " #f1f1f1";
    del.style.display = "inline";
    del.style.visibility = "visible";
  }
  toolbar1(i: number) {

    let row = document.getElementById("row" + i);
    let del = document.getElementById("del" + i);

    row.style.borderColor = "none";
    del.style.display = "none";
    del.style.visibility = "hidden";
  }
  filterPartner() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("partner");
    filter = input.value.toUpperCase();
    table = document.getElementById("seriuosnessTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  deleteSerial(s) {
    var div = document.getElementById('alert');
    div.style.visibility = "visible";
    this.currectSeria = s;
   }
   ok(s) {
    console.log("ok");
    
    if (s != '') {
      var tt= this.seriousnessService.deleteSeria(this.currectSeria);
      // console.log( tt);
      this.seriousnessService.getAllSeriousness().subscribe(ans => this.seriousnessList = ans);
    }
    this.currectSeria = null;
    var div = document.getElementById('alert');
    div.style.visibility = "hidden";
  }
}
