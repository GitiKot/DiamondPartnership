import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md/lib/free/modals/modal.directive';
import { Expenses } from 'src/app/data/expenses';
import { ExpensesService } from 'src/app/services/expenses.service';

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
  @Output() updateFlag = new EventEmitter<number>();

  constructor(private r: Router, private expensesService: ExpensesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    // this.expensesService.getAllExpenses().subscribe(ans => this.expensesList = ans);
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
    console.log("updateex", this.updateEx);

    if (this.updateEx != undefined) {
      console.log("iibfuuuuuuuuuu");
      console.log(this.updateEx.detail);
      this.expensesForm.patchValue({
        PublicSerialName: this.updateEx.PublicSerialName,
        date: this.updateEx.date,
        getchack: this.updateEx.getchack,
        InvoiceNumber: this.updateEx.InvoiceNumber,
        amountPartner: this.updateEx.amountPartner,
        amount: this.updateEx.amount,
        Remarks: this.updateEx.Remarks,
      });
      console.log("amount:", this.amount.value);


      // this.expensesForm.setControl('detail', this.formBuilder.array(this.updateEx.detail));
      this.updateEx.detail.forEach(e => {
        this.editDetail(e.expenses, e.price);
      })
    }


  }

  ngAfterViewInit() {
    this.showModalOnClick1.show();
  }

  close() {

    if (this.updateEx != undefined) {
      this.showModalOnClick.hide();
      this.showModalOnClick1.hide();
    }
    else {
      // this.r.navigate(['expenses']);
    }
    console.log("close");
    this.updateFlag.emit(0);
    console.log(this.updateFlag);

  }

  save() {

    if (this.expensesForm.valid) {

      this.expensesForm.value.amount = this.expensesForm.value.detail
        .reduce((prev, curr) => prev + Number(curr.price), 0);
      this.expensesService.addExpenses(this.expensesForm.value).subscribe(e => {
        this.r.navigate(['expenses/expenses-form/modal-form', 'הוצאה'])
      }, () => {
        console.log("error");
        // this.expensesForm.reset();
      })
    }
    else {
      alert("חסרים נתונים");
    }
    this.showModalOnClick.hide();
    this.showModalOnClick1.hide();
    // צריך פה לעשות רפרש לטבלה
    // this.r.navigate(['expenses']);
    this.updateFlag.emit(1);
    this.r.navigate(['']);
  }

  update() {

    if (this.expensesForm.valid) {

      if (this.expensesForm.value.detail.length != 0) {
        this.expensesForm.value.amount = this.expensesForm.value.detail
          .reduce((prev, curr) => prev + Number(curr.price), 0);
      }
      else {
        this.expensesForm.value.amount = 0;
        console.log("sss", this.expensesForm.value.amount);
      }
      this.expensesService.updateExpenses(this.updateEx.id, this.expensesForm.value).subscribe(e => {
        this.r.navigate(['expenses/expenses-form/modal-form', 'הוצאה'])
      }, () => {
        console.log("error");
      })
    }
    else {
      alert("חסרים נתונים");
    }
    this.showModalOnClick.hide();
    this.showModalOnClick1.hide();
    this.updateFlag.emit(1);
    this.r.navigate(['']);
  }
  savemodal() {

    this.showModalOnClick.hide();
    this.showModalOnClick1.show();
    // if (this.expensesForm.value.detail) { }
  }

  cancelex() {

    this.detail.reset();
    this.detail.clear();

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
  updateDetail(ex: string, p: number): FormGroup {
    return this.formBuilder.group({
      expenses: ex,
      price: p,
    })
  }

  editDetail(ex: string, p: number) {

    this.detail.push(this.updateDetail(ex, p));
  }
  removeDetail(i: number) {
    this.detail.removeAt(i);
  }
  // delete this rows????
  getaDetail(i: number) {
    console.log(this.expensesForm[i].detail.length);
  }
}




