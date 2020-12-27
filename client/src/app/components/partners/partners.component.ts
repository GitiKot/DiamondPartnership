import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';
import { from } from 'rxjs';
import { Partner } from 'src/app/data/partner';

import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ContactNumberValidator } from 'src/app/validtors/contact.validator';
import { phoneValidator } from 'src/app/validtors/phone.validator';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  partnersList: Array<Partner>;
  partnersForm: FormGroup;
  currectPartner: Partner;
  constructor(private r: Router, private partnerService: PartnerService) { }

  ngOnInit(): void {
    this.partnerService.getAllPartners().subscribe(ans => {
      this.partnersList = ans; console.log("partner");
    });

    this.partnersForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      contact: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.compose([Validators.minLength(9), Validators.pattern('[0][2,3,4,8,9][0-9]{7}')])),
      pel: new FormControl('', Validators.compose([Validators.minLength(10), Validators.pattern('[0][5][0-9]{8}'), phoneValidator()])),
      fax: new FormControl('', Validators.required),
      Remarks: new FormControl(''),

    }, ContactNumberValidator(['phone', 'pel', 'email'])); console.log(this.partnersForm.controls.email.value);
  
  }
  get name() {
    return this.partnersForm.get('name');
  }
  get email() {
    return this.partnersForm.get('email');
  }
  get contact() {
    return this.partnersForm.get('contact');
  }
  get phone() {
    return this.partnersForm.get('phone');
  }
  get pel() {
    return this.partnersForm.get('pel');
  }
  get fax() {
    return this.partnersForm.get('fax');
  }
  get Remarks() {
    return this.partnersForm.get('Remarks');
  }
  save(){
    // alert("האם הנך בטוח במה שאתה עושה");
    if (this.partnersForm.valid) {
      // const p = new Partner();
      this.partnerService.addPartner(this.partnersForm.value)
        .subscribe(a => {
          this.r.navigate(['partners/modal-form', 'שותף'])
          this.partnersForm.reset();
        }, () => {
          console.log("error");
        });
    }

  }
  resetform() {
    this.partnersForm.reset();
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
