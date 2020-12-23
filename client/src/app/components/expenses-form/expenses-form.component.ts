import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md/lib/free/modals/modal.directive';
import { Expenses } from 'src/app/data/expenses';
import { ExpensesService } from 'src/app/services/expenses.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.css']
})

export class ExpensesFormComponent implements OnInit {
  @ViewChild('frame2') public showModalOnClick: ModalDirective;//model s
  @ViewChild('frame1') public showModalOnClick1: ModalDirective;//model big
  expensesForm: FormGroup;
  expensesList: Array<Expenses>;

  @Input() updateEx: Expenses;

  constructor(private r: Router, private expensesService: ExpensesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.expensesService.getAllExpenses().subscribe(ans => this.expensesList = ans);
    this.expensesForm = this.formBuilder.group({
      PublicSerialName: ['', [Validators.required]],
      date: ['', [Validators.required]],
      getchack: ['', [Validators.required]],
      InvoiceNumber: ['', [Validators.required]],
      amountPartner: ['', [Validators.required]],
      amount: [''],
      detail: this.formBuilder.array([]),
      Remarks: [''],
    })
    // this.expensesForm.controls['PublicSerialName'].setValue(this.updateEx.PublicSerialName);
    if (this.updateEx != undefined) {
      console.log("iibfuuuuuuuuuu");
      console.log(this.updateEx.date);

     
      
      this.expensesForm.setValue({

        PublicSerialName: this.updateEx.PublicSerialName,
        date: this.updateEx.date,
        getchack: this.updateEx.getchack,
        InvoiceNumber: this.updateEx.InvoiceNumber,
        amountPartner: this.updateEx.amountPartner,
        amount: this.updateEx.amount,

        Remarks: this.updateEx.Remarks, 
        detail: this.updateEx.detail,
      })
      console.log("tfffffffffffff");
      console.log(this.expensesForm.controls.date);

    }

    console.log("uuuuuuuuuuuuu");
    //  console.log(this.updateEx.detail);
    console.log(this.updateEx);

  }
//   setTimeout(() => {
//     this.deviceForm.setValue({
//      name: this.editedDevice.name,
//      platform: this.editedDevice.platform,
//      type: this.editedDevice.type,
//      udid: this.editedDevice.frame
//    });
//  }, );
  ngAfterViewInit() {
    this.showModalOnClick1.show();
  }

  close() {

    this.r.navigate(['']);
    // this.r.navigate(['expenses']);
  }

  save() {
    // console.log(this.expensesForm.value);
    alert("האם ברצונך לשמור את הנתונים")
    if (this.expensesForm.valid) {

      this.expensesForm.value.amount = this.expensesForm.value.detail
        .reduce((prev, curr) => prev + Number(curr.price), 0);
      // if (this.expensesForm.value.detail) {
      //   for (let i = 0; i < this.expensesForm.value.detail.length; i++) {
      //     if (this.expensesForm.value.detail[i].expenses == ""
      //       && this.expensesForm.value.detail[i].price == "") {        
      //       cnt++; }  }   
      //         if (cnt == this.expensesForm.value.detail.length) {
      //           console.log(cnt);
      // this.expensesForm.value.detail='';
      //         }
      // console.log(this.expensesForm.value.detail.length);
      // }
      this.expensesService.addExpenses(this.expensesForm.value).subscribe(e => {
        this.expensesList.push(e);
        this.expensesForm.reset();
      })

    }
    this.showModalOnClick.hide();
    this.showModalOnClick1.hide();
    // צריך פה לעשות רפרש לטבלה
    // this.r.navigate(['expenses']);
    this.r.navigate(['']);
  }


  savemodal() {
    // console.log(this.expensesForm.value.detail);
    this.showModalOnClick.hide();
    this.showModalOnClick1.show();
    // if (this.expensesForm.value.detail) { }
  }

  cancelex() {
    // console.log(this.expensesForm.controls);
    this.detail.reset();
    this.detail.clear();
    //  console.log( this.showModalOnClick.isShown);
    // this.expensesForm.reset();
    this.showModalOnClick.hide();
    this.showModalOnClick1.show();

  }

  get PublicSerialName() {
    return this.expensesForm.get('PublicSerialName');
  }
  get date() {
    return this.expensesForm.get('date');
  }

  get getchack() {
    return this.expensesForm.get('getchack');
  }

  get InvoiceNumber() {
    return this.expensesForm.get('InvoiceNumber');
  }
  get amount() {
    return this.expensesForm.get('amount');
  }
  get amountPartner() {
    return this.expensesForm.get('amountPartner');
  }
  get detail(): FormArray {
    return this.expensesForm.get('detail') as FormArray
  }

  get expenses() {
    return this.expensesForm.get("detail").get('expenses');
  }
  get price() {
    return this.expensesForm.get("detail").get('price');
  }
  get Remarks() {
    return this.expensesForm.get('Remarks');
  }

  newDetail(): FormGroup {
    return this.formBuilder.group({
      expenses: '',
      price: '',
    })
  }

  addDetail() {

    this.detail.push(this.newDetail());
  }

  removeDetail(i: number) {
    this.detail.removeAt(i);
  }

  getaDetail(i: number) {
    console.log(this.expensesForm[i].detail.length);
  }
}




