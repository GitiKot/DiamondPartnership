import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalModule } from 'angular-bootstrap-md';
import { ModalDirective } from 'angular-bootstrap-md/lib/free/modals/modal.directive';
import { from } from 'rxjs';
import { Partner } from 'src/app/data/partner';
import { Seriousness } from 'src/app/data/seriousness';
import { PartnerService } from 'src/app/services/partner.service';
import { seriousnessService } from 'src/app/services/seriousness.service';
import { ModalFormComponent } from '../modal-form/modal-form.component';

@Component({
  selector: 'app-serial-form',
  templateUrl: './serial-form.component.html',
  styleUrls: ['./serial-form.component.css']
})
export class SerialFormComponent implements OnInit {
  serialForm: FormGroup;
  partnerList: Array<Partner>;

  @ViewChild('frame1') frame1: ModalDirective;
  @ViewChild('frame2') frame2: ModalDirective;
  @Input() updateSerial: Seriousness;
  totalPrice = [];
  selectedPartner: Partner;
  constructor(private changeDetectorRef: ChangeDetectorRef, private r: Router, private partnerService: PartnerService, private seriousnessService: seriousnessService, private formBuilder: FormBuilder) { }
  // Validators.compose([Validators.minLength(10)
  ngOnInit(): void {
    this.partnerService.getAllPartners().subscribe(ans => { this.partnerList = ans; })

    this.serialForm = this.formBuilder.group({
      serialName: ['', [Validators.required]],
      dateBuy: ['', [Validators.required]],
      cost: ['', [Validators.required]],
      partnersPercent: ['', [Validators.compose([Validators.required, Validators.pattern('[0-9]{2}')])]],
      finishDate: ['',],
      privateSeria: this.formBuilder.array([]),
      partner: ['', [Validators.required]],
    });
    this.totalPrice['לחץ לפרטים']

    if (this.updateSerial != undefined) {
      console.log("iibfuuuuuuuuuu");
      console.log(this.updateSerial.privateSeria);
      this.serialForm.patchValue({
        serialName: this.updateSerial.serialName,
        dateBuy: this.updateSerial.dateBuy,
        cost: this.updateSerial.cost,
        partnersPercent: this.updateSerial.partnersPercent,
        finishDate: this.updateSerial.finishDate,
        privateSeria: this.updateSerial.privateSeria,
        partner: this.updateSerial.partner,
      });
      this.serialForm.setControl('privateSeria', this.formBuilder.array(this.updateSerial.privateSeria));
      console.log("this.privateSeria");
      console.log(this.serialForm.value.privateSeria);

      
      this.serialForm.value.privateSeria.forEach(p => {
        this.privateSeria.push(this.formBuilder.group({
          namePrivate: p.namePrivate,
          price: p.price,
          expenses:p.expenses,

         
        }));     
        // this.serialForm.value.privateSeria.setControl('expenses',this.formBuilder.array(p));
        console.log("p");
        console.log(p);
        
console.log("ex",this.serialForm.value.privateSeria);
console.log("control",this.serialForm.value.privateSeria.controls);
console.log("value",this.serialForm.value.privateSeria.value);
console.log("ex",this.serialForm.value.privateSeria.expenses);

      //   this.serialForm.value.privateSeria.expenses.forEach(e => {
      //     console.log("e",e);
          
      // this.privateSeria.push(this.formBuilder.group({
      //       nameExpenses: e.nameExpenses,
      //       exspensesPrice: e.exspensesPrice,
          
      //     }));     
         
  
        // });

      });



      // this.serialForm.setControl('expenses', this.formBuilder.array(this.updateSerial.privateSeria));
      //   console.log("this.expenses");
      //   console.log(this.serialForm.value.privateSeria);
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
  save() {
    this.serialForm.get('partner').setValue(this.selectedPartner)
    // console.log(this.privateSeria.value);
    console.log(this.serialForm.value);


    if (this.serialForm.valid) {
      this.seriousnessService.addSeria(this.serialForm.value).subscribe(sss => {
        this.r.navigate(['seriousness/serial-form/modal-form', 'סריה'])
      }, () => {
        console.log("error");
      })
    }


    else {
      alert("חסרים נתונים")
    }
    this.serialForm.reset();
    // this.r.navigate(['./seriousness'])
  }

  close() {
    this.r.navigate(['seriousness']);
  }
  cancelex() {
    this.privateSeria.reset();
    this.r.navigate(['seriousness']);

  } get serialName() {
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
  // get expensesArray(): FormArray {
  //   return this.serialForm.get("privateSeria").get('expensesArray') as FormArray;
  // }
  expenses(index: number): FormArray {
    return this.privateSeria.at(index).get("expenses") as FormArray
  }

  //privateSeria:Array<{namePrivate:string,price:number,expenses:Array<{nameExpenses:string,price:number}>}>;

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
  get nameExpenses() {
    return this.serialForm.get("privateSeria").get('expenses').get('nameExpenses');
  }
  get exspensesPrice() {
    return this.serialForm.get("privateSeria").get('expenses').get('exspensesPrice');
  }
  addPrivateSerial() {
    console.log('privateSeria:');
    this.privateSeria.push(this.newPrivateSerial());
    console.log(this.privateSeria.value);
  }
  addExArrray(i: number) {
    console.log("i= " + i);
    this.expenses(i).push(this.newExpenses())
    console.log('privateSeria[i].expenses :  ');
    console.log(this.expenses(i).value);
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