import { Component, OnInit, ViewChild } from '@angular/core';
import { PartnerService } from 'src/app/services/partner.service';
import { Partner } from 'src/app/data/partner';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md/lib/free/modals/modal.directive';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  @ViewChild('frame') public showModalOnClick: ModalDirective;
  partnersList: Array<Partner>;
  partnersForm: FormGroup;
  currectPartner: Partner;
  p: Partner;
  flagupdate = 0;

  constructor(private modalService: ModalService, public partnerService: PartnerService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    // this.partnerService.getAllPartners().subscribe(ans => {
    //   this.partnerService.partnerList = ans
    // });
  


    // this.partnerService.getAllPartners()
    //   .subscribe((data: any[]) => {

    //   });  
    this.partnersForm = this.formBuilder.group({});
  }

  newPartner() {
    this.modalService.openModal('partners-form');
  }

  updateflag(part) {

    this.modalService.openModal('partners-form', part, 'update')
  }

  deletePartner(p) {
    var div = document.getElementById('alert');
    div.style.visibility = "visible";
    this.currectPartner = p;
  }
  ok(s) {

    if (s != '') {
      var tt = this.partnerService.deletePartner(this.currectPartner);
      this.partnerService.getAllPartners().subscribe(ans => this.partnersList = ans);
    }
    this.currectPartner = null;
    var div = document.getElementById('alert');
    div.style.visibility = "hidden";
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
}
