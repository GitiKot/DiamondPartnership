import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Partner } from 'src/app/data/partner';
import { PartnerService } from 'src/app/services/partner.service';
import { phoneValidator } from 'src/app/validtors/phone.validator';
import { ContactNumberValidator } from 'src/app/validtors/contact.validator'
import { ModalDirective } from 'angular-bootstrap-md/lib/free/modals/modal.directive';
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'app-partners-form',
  templateUrl: './partners-form.component.html',
  styleUrls: ['./partners-form.component.css']
})
export class PartnersFormComponent implements OnInit {

  partnersList: Array<Partner>;
  partnersForm: FormGroup;
  currectPartner: Partner;

  @ViewChild('frame') public showModalOnClick: ModalDirective;
  constructor(public modalService: ModalService, private partnerService: PartnerService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.partnersForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.compose([Validators.required, Validators.email])]],
      contact: ['', [Validators.required]],
      phone: ['', [Validators.compose([Validators.minLength(9), Validators.pattern('[0][2,3,4,8,9][0-9]{7}')])]],
      pel: ['', [Validators.compose([Validators.minLength(10), Validators.pattern('[0][5][0-9]{8}'), phoneValidator()])]],
      fax: ['', [Validators.required]],
      Remarks: [''],
    }, ContactNumberValidator(['phone', 'pel', 'email']));
    if (this.modalService.action === 'update') {
      this.currectPartner = this.modalService.data;

      if (this.currectPartner != undefined) {

        this.partnersForm.patchValue({
          name: this.currectPartner.name,
          contact: this.currectPartner.contact,
          phone: this.currectPartner.phone,
          email: this.currectPartner.email,
          pel: this.currectPartner.pel,
          fax: this.currectPartner.fax,
          Remarks: this.currectPartner.Remarks,
        });
      }
    }
  }
  ngAfterViewInit() {
    this.showModalOnClick.show();
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
  // save and update partner 
  save() {
    if (this.modalService.action === 'update') {
      if (this.partnersForm.valid) {
        this.partnerService.updatePartner(this.currectPartner.id, this.partnersForm.value).subscribe(() => {
          this.partnerService.getAllPartners().subscribe(ans => { this.partnerService.partnerList = ans })
          this.modalService.openModal('sucsses-form', { name: 'שותף' });

        }, () => {
          console.log("error");
        })
      }
      else {
        alert("חסרים נתונים");
      }
    }
    else {

      if (this.partnersForm.valid) {
        this.partnerService.addPartner(this.partnersForm.value).subscribe(a => {
          this.partnerService.partnerList.push(this.partnersForm.value)
          this.modalService.openModal('sucsses-form', { name: 'שותף' });
        }, () => {
          console.log("error");
        });
      }
      else {
        alert("חסרים נתונים");
      }
    }
    this.showModalOnClick.hide();
  }

  close() {
    this.modalService.closeModal();
  }
}
