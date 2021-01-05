import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckboxComponent, ModalModule } from 'angular-bootstrap-md';
import { ModalDirective } from 'angular-bootstrap-md/lib/free/modals/modal.directive';
import { Partner } from 'src/app/data/partner';
import { Seriousness } from 'src/app/data/seriousness';
import { PartnerService } from 'src/app/services/partner.service';
import { seriousnessService } from 'src/app/services/seriousness.service';

@Component({
  selector: 'app-serial-form',
  templateUrl: './serial-form.component.html',
  styleUrls: ['./serial-form.component.css']
})
export class SerialFormComponent implements OnInit {
  serialForm: FormGroup;
  partnerList: Array<Partner>;
  totalPrice = [];
  partnerId;
  @ViewChild('frame1') frame1: ModalDirective;
  @ViewChild('frame2') frame2: ModalDirective;
  @Input() updateSerial: Seriousness;
  @Output() updateFlag = new EventEmitter<number>();

  constructor(private changeDetectorRef: ChangeDetectorRef, private r: Router, private partnerService: PartnerService, private seriousnessService: seriousnessService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.partnerService.getAllPartners().subscribe(ans => { this.partnerList = ans; })

    this.serialForm = this.formBuilder.group({
      serialName: ['', [Validators.required]],
      dateBuy: ['', [Validators.required]],
      cost: ['', [Validators.required]],
      partnersPercent: ['', [Validators.compose([Validators.required, Validators.pattern('[0-9]{2}')])]],
      finishDate: ['',],
      privateSeria: this.formBuilder.array([]),
      partner: [''],
    });
    this.totalPrice['לחץ לפרטים']

    if (this.updateSerial != undefined) {
      this.serialForm.patchValue({
        serialName: this.updateSerial.serialName,
        dateBuy: this.updateSerial.dateBuy,
        cost: this.updateSerial.cost,
        partnersPercent: this.updateSerial.partnersPercent,
        finishDate: this.updateSerial.finishDate,
        privateSeria: this.updateSerial.privateSeria,
        partner: this.updateSerial.partner,
      });
      let i = 0;
      this.updateSerial.privateSeria.forEach(s => {
        this.editPrivateSerial(s.namePrivate, s.price);
        s.expenses.forEach(ex => {
          this.editExArrray(i, ex.nameExpenses, ex.exspensesPrice);
        });
        i++;
      })
      if (this.updateSerial.finishDate) {
        let cbox = document.getElementById('form3');
        (((cbox as Element) as Input) as CheckboxComponent).checked = true;
      }
    }
  }
  updateFinishDate() {
    let cbox = document.getElementById('form3');
    if (this.updateSerial != undefined) {
      if (this.updateSerial.finishDate != undefined) {
        if ((((cbox as Element) as Input) as CheckboxComponent).checked == false) {
          this.updateSerial.finishDate = null;
          this.serialForm.value.finishDate = null;
        }
      }
    }
  }
  // ngAfterContentChecked() {
  //   this.changeDetectorRef.detectChanges();
  //   // console.log(" detece chande");
  // }
  // onCloseMember() {
  // this.changeDetectorRef.detectChanges();
  // }
  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
    this.frame1.show();
  }
  Table2() {
    var elem = document.getElementById("TableNested2");
    var hide = elem.style.display == "none";
    if (hide) {
      elem.style.display = "table";
    }
    else {
      elem.style.display = "none";
    }
  }
  selectedPartnerId(event) {
    let p = event.target.value;
    let idp = document.getElementById(p);
    if (idp) {
      console.log("idp,id", idp, idp.id);
      let att = idp.getAttribute('data-value');
      console.log("att", att);
      this.partnerId = att;
    }
    else {
      alert("עליך לבחור שם שותף שקיים")
    }
  }
  save() {
    this.serialForm.get('partner').setValue(this.partnerId)
    if (this.serialForm.valid && this.serialForm.value.partner) {
      this.seriousnessService.addSeria(this.serialForm.value).subscribe(sss => {
        this.r.navigate(['seriousness/serial-form/modal-form', 'סריה'])
      }, () => {
        console.log("error");
      })
    }
    else {
        alert("חסרים נתונים")
    }
    this.updateFlag.emit(1);
  }
  update() {
    this.serialForm.get('partner').setValue(this.partnerId)
    let cbox = document.getElementById('form3');
    if ((((cbox as Element) as Input) as CheckboxComponent).checked == false) {
      this.serialForm.value.finishDate = null;
    }
    if (this.serialForm.value.partner == undefined) {
      console.log("this.updateSerial.partner", this.updateSerial.partner);
      this.serialForm.value.partner = this.updateSerial.partner;
    }
    console.log(this.serialForm.value);
    console.log(this.serialForm.valid);
    if (this.serialForm.valid) {
      this.seriousnessService.updateSerial(this.updateSerial.id, this.serialForm.value).subscribe(() => {
        this.r.navigate(['seriousness/serial-form/modal-form', 'סריה'])
      }, () => {
        console.log("error");
      })
    }
    else {
        alert("חסרים נתונים")
    }
    this.updateFlag.emit(1);
  }
  close() {
    if (this.updateSerial != undefined) {
      this.frame2.hide();
      this.frame1.hide();
    }
    this.updateFlag.emit(0);
  }
  get serialName() {
    return this.serialForm.get('serialName');
  }
  get dateBuy() {
    return this.serialForm.get('dateBuy');
  }
  get cost() {
    return this.serialForm.get('cost');
  }
  get partner() {
    return this.serialForm.get('partner');
  }
  get finishDate() {
    return this.serialForm.get('finishDate');
  }
  get partnersPercent() {
    return this.serialForm.get('partnersPercent');
  }
  get privateSeria(): FormArray {
    return this.serialForm.get('privateSeria') as FormArray
  }
  expenses(index: number): FormArray {
    return this.privateSeria.at(index).get("expenses") as FormArray
  }
  get namePrivate() {
    return this.serialForm.get("privateSeria").get('namePrivate');
  } get price() {
    return this.serialForm.get("privateSeria").get('price');
  }
  newPrivateSerial(): FormGroup {
    return this.formBuilder.group({
      namePrivate: '',
      price: '',
      expenses: this.formBuilder.array([]),
    })
  }
  newExpenses(): FormGroup {
    return this.formBuilder.group({
      nameExpenses: '',
      exspensesPrice: ''
    })
  }
  updatePrivateSerial(n: string, p: number): FormGroup {
    return this.formBuilder.group({
      namePrivate: n,
      price: p,
      expenses: this.formBuilder.array([]),
    })
  }
  updateExpenses(n: string, p: number): FormGroup {
    return this.formBuilder.group({
      nameExpenses: n,
      exspensesPrice: p,
    })
  }
  get nameExpenses() {
    return this.serialForm.get("privateSeria").get('expenses').get('nameExpenses');
  }
  get exspensesPrice() {
    return this.serialForm.get("privateSeria").get('expenses').get('exspensesPricep');
  }
  addPrivateSerial() {
    this.privateSeria.push(this.newPrivateSerial());
  }
  addExArrray(i: number) {
    this.expenses(i).push(this.newExpenses())
  }
  editPrivateSerial(n: string, p: number) {
    this.privateSeria.push(this.updatePrivateSerial(n, p));
  }
  editExArrray(i: number, n: string, p: number) {
    this.expenses(i).push(this.updateExpenses(n, p));
  }
  removePrivateSerial(i: number) {
    this.privateSeria.removeAt(i);
  }
  cancelPrivateSerial() {
    this.privateSeria.clear()
    this.frame2.hide()
  }
  savePrivateSerial() {
    console.log(this.privateSeria.value);
    this.frame2.hide()
  }
  removePrivate(i: number) {
    this.privateSeria.removeAt(i);
  }
  removeExpPrivate(i: number, ip: number) {
    this.expenses(i).removeAt(ip)
  }
}