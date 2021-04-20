import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {  FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  @Input() updateP: Partner;
  @Output() updateFlag = new EventEmitter<number>();
  @ViewChild('frame') public showModalOnClick: ModalDirective;
  constructor(public modalService:ModalService,private partnerService: PartnerService, private router: Router,private formBuilder: FormBuilder) { }
 
  ngOnInit(): void 
  {
      this.partnersForm = this.formBuilder.group({
          name: ['', [Validators.required]],
          email: ['', [Validators.compose([Validators.required, Validators.email])]],
          contact:['', [Validators.required]],
          phone: ['', [Validators.compose([Validators.minLength(9), Validators.pattern('[0][2,3,4,8,9][0-9]{7}')])]],
          pel: ['', [Validators.compose([Validators.minLength(10), Validators.pattern('[0][5][0-9]{8}'), phoneValidator()])]],
          fax: ['', [Validators.required]],
          Remarks: [''],
        }, ContactNumberValidator(['phone', 'pel', 'email'])); console.log(this.partnersForm.controls.email.value);
        if(this.modalService.action==='update')
this.currectPartner=this.modalService.data;
console.log(this.currectPartner);

      // this.partnersForm = new FormGroup({
      //   name: new FormControl('', Validators.required),
      //   email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      //   contact: new FormControl('', Validators.required),
      //   phone: new FormControl('', Validators.compose([Validators.minLength(9), Validators.pattern('[0][2,3,4,8,9][0-9]{7}')])),
      //   pel: new FormControl('', Validators.compose([Validators.minLength(10), Validators.pattern('[0][5][0-9]{8}'), phoneValidator()])),
      //   fax: new FormControl('', Validators.required),
      //   Remarks: new FormControl(''),
      // }, ContactNumberValidator(['phone', 'pel', 'email'])); console.log(this.partnersForm.controls.email.value);
    
      console.log("updateex", this.currectPartner);
      if (this.currectPartner != undefined) {
        console.log("iu");
        console.log(this.currectPartner);
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
    // var firstInput = document.getElementById('name');
    // var allInput = document.querySelectorAll('input');
    // firstInput.focus();
    // ///פוקוס
    // var input = document.getElementById("name");
    // allInput.forEach(a => a.addEventListener("keypress", function (event) {
    //   if (event.code === "Enter") {
    //     var current = (event.target as Element);
    //     event.preventDefault();
    //     var index = current.getAttribute('tabindex');
    //     var num = (Number(index));
    //     num += 1;
    //     // let nextInput= document.querySelector('[tabindex=num]');
    //     let nextInput = FindByAttributeValue("tabindex", num, "input");
    //     if (nextInput != undefined) {
    //       // alert(nextInput);
    //       nextInput.focus();
    //     }
    //     else {
    //       var save = document.getElementById('save');
    //       save.focus();
    //       alert("האם הנך בטוח במה שאתה עושה");
    //     }
    //     function FindByAttributeValue(attribute, value, element_type) {
    //       element_type = element_type || "*";
    //       var All = document.getElementsByTagName(element_type);
    //       for (var i = 0; i < All.length; i++) {
    //         if (All[i].getAttribute(attribute) == value) { return All[i]; }
    //       } }  }
    // }, false))
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
  save(){
  
    if (this.partnersForm.valid) {
      this.partnerService.addPartner(this.partnersForm.value).subscribe(a => {
          // this.router.navigate(['partners/partners-form/sucsses-form', 'שותף'])  
          this.modalService.openModal('sucsses-form', { name: 'שותף'});

        }, () => {
          console.log("error");
        });
    }
    else{
      alert("חסרים נתונים");
    }
    this.showModalOnClick.hide();
    this.updateFlag.emit(1);
    this.router.navigate(['']);
  }
  update() {

    if (this.partnersForm.valid) {

      this.partnerService.updatePartner(this.updateP.id, this.partnersForm.value).subscribe(() => {
        this.modalService.openModal('sucsses-form', { name: 'שותף'});
        // this.router.navigate(['partners/partners-form/sucsses-form', 'שותף'])
      }, () => {
        console.log("error");
      }) 
    }
    else {
      alert("חסרים נתונים");
    }
    this.showModalOnClick.hide();
    this.updateFlag.emit(1);
    // this.close();
    this.router.navigate(['']);
  }
  close() {
    if (this.updateP != undefined) {
      this.showModalOnClick.hide();
    }
    else {
    }
    console.log("close");
    this.updateFlag.emit(0);
  }
  // deletePartner(p) {
  //   var div = document.getElementById('alert');
  //   div.style.visibility = "visible";
  //   this.currectPartner = p;
  // }
  // ok(s) {
  //   console.log("ok");
    
  //   if (s != '') {
  //     var tt = this.partnerService.deletePartner(this.currectPartner);
  //     console.log(tt);
  //     this.partnerService.getAllPartners().subscribe(ans => this.partnersList = ans);
  //   }
  //   this.currectPartner = null;
  //   var div = document.getElementById('alert');
  //   div.style.visibility = "hidden";
  // }
  // toolbar(i: number) {

  //   let row = document.getElementById("row" + i);
  //   let del = document.getElementById("del" + i);
  //   let update = document.getElementById("update" + i);
  //   row.style.borderColor = " #f1f1f1";
  //   del.style.display = "inline";
  //   del.style.visibility = "visible";
  //   update.style.display = "inline";
  //   update.style.visibility = "visible";
  // }
  // toolbar1(i: number) {

  //   let row = document.getElementById("row" + i);
  //   let del = document.getElementById("del" + i);
  //   let update = document.getElementById("update" + i);
  //   row.style.borderColor = "none";
  //   del.style.display = "none";
  //   del.style.visibility = "hidden";
  //   update.style.display = "none";
  //   update.style.visibility = "hidden";
  // }
}
