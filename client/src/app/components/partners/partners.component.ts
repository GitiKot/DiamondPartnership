import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';
import { from } from 'rxjs';
import { Partner } from 'src/app/data/partner';

import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  partnersList: Array<Partner>;
  validatingForm: FormGroup;
  currectPartner: Partner;
  constructor(private r: Router, private partnerService: PartnerService) { }

  ngOnInit(): void {
    this.partnerService.getAllPartners().subscribe(ans => {
      this.partnersList = ans; console.log("fghj");
    });


    this.validatingForm = new FormGroup({
      contactFormModalName: new FormControl('', Validators.required),
      contactFormModalEmail: new FormControl('', Validators.email),
      contactFormModalSubject: new FormControl('', Validators.required),
      contactFormModalMessage: new FormControl('', Validators.required)
    });
  }
  get contactFormModalName() {
    return this.validatingForm.get('contactFormModalName');
  }

  get contactFormModalEmail() {
    return this.validatingForm.get('contactFormModalEmail');
  }

  get contactFormModalSubject() {
    return this.validatingForm.get('contactFormModalSubject');
  }

  get contactFormModalMessage() {
    return this.validatingForm.get('contactFormModalMessage');
  }
  deletePartner(p) {
    var div = document.getElementById('alert');
    div.style.visibility = "visible";
    this.currectPartner = p;

  }
  ok(s) {
    console.log("ok");
    
    if (s != '') {
      var tt = this.partnerService.deletePartner(this.currectPartner);
      console.log(tt);
      this.partnerService.getAllPartners().subscribe(ans => this.partnersList = ans);
    }
    this.currectPartner = null;
    var div = document.getElementById('alert');
    div.style.visibility = "hidden";
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
}
