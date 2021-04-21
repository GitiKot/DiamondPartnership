import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Seriousness } from 'src/app/data/seriousness'
import { ModalService } from 'src/app/services/modal.service';
import { seriousnessService } from 'src/app/services/seriousness.service'
@Component({
  selector: 'app-seriousness',
  templateUrl: './seriousness.component.html',
  styleUrls: ['./seriousness.component.css'],
})
export class SeriousnessComponent implements OnInit {
  @ViewChild('frame2') frame2: ModalDirective;
  indexSerial: number;
  currectSeria: Seriousness;
  s: Seriousness;
  flagupdate = 0;
  constructor(private modalService:ModalService ,public seriousnessService: seriousnessService) { }

  seriousnessList: Array<Seriousness>
  ngOnInit(): void {

    this.seriousnessService.getAllSeriousness().subscribe(ans => { this.seriousnessList = ans  });


  }
  newSeria() {
    this.modalService.openModal('serial-form');
  }
 
  updateSeria(serial) {
    
    this.modalService.openModal('serial-form',serial,'update');
    // this.s = serial;
    // this.flagup/date = 1;
  }
  // updateFromFlag(event) {
  //   this.flagupdate = event;
  // }
  filterNameSeria() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("public");
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
  filterPartner() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("partner");
    filter = input.value.toUpperCase();
    table = document.getElementById("seriuosnessTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[4];
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
    let update = document.getElementById("update" + i);

    row.style.borderColor = " #f1f1f1";
    del.style.display = "inline";
    del.style.visibility = "visible";
    update.style.display = "inline";
    update.style.visibility = "visible";
  }
  toolbar1(i: number) {

    let row = document.getElementById("row" + i);
    let del = document.getElementById("del" + i);
    let update = document.getElementById("update" + i);
    row.style.borderColor = "none";
    del.style.display = "none";
    del.style.visibility = "hidden";
    update.style.display = "none";
    update.style.visibility = "hidden";
  }
  deleteSerial(s) {
    var div = document.getElementById('alert');
    div.style.visibility = "visible";
    this.currectSeria = s;
  }
  ok(messsege) {
    console.log("ok");

    if (messsege != '') {
      var tt = this.seriousnessService.deleteSeria(this.currectSeria);
      this.seriousnessService.getAllSeriousness().subscribe(ans => this.seriousnessList = ans);
    }
    this.currectSeria = null;
    var div = document.getElementById('alert');
    div.style.visibility = "hidden";
  }
}
