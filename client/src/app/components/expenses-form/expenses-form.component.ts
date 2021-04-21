import { Component,  OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md/lib/free/modals/modal.directive';
import { Expenses } from 'src/app/data/expenses';
import { Seriousness } from 'src/app/data/seriousness';
import { ExpensesService } from 'src/app/services/expenses.service';
import { ModalService } from 'src/app/services/modal.service';
import{ seriousnessService}from 'src/app/services/seriousness.service';

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
  seriousnessList: Array<Seriousness>;
  place; 
  currentEx:Expenses;

  constructor( public modalService:ModalService, private expensesService: ExpensesService,private seriousnessService: seriousnessService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.seriousnessService.getAllSeriousness().subscribe(ans => {
      this.seriousnessList = ans;
    });
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

if(this.modalService.action==='update'){
this.currentEx=this.modalService.data;
  if (this.currentEx != undefined) {
    
    this.expensesForm.patchValue({
      PublicSerialName: this.currentEx.PublicSerialName,
      date: this.currentEx.date,
      getchack: this.currentEx.getchack,
      InvoiceNumber: this.currentEx.InvoiceNumber,
      amountPartner: this.currentEx.amountPartner,
      amount: this.currentEx.amount,
      Remarks: this.currentEx.Remarks,
    });
}
        this.currentEx.detail.forEach(e => {
        this.editDetail(e.expenses, e.price);
      })
    }
  }

  ngAfterViewInit() {
    this.showModalOnClick1.show();
  }
  selectedExpensesId(event){
    let s = event.target.value;
    let ids = document.getElementById(s);
    if (ids) {
    this.place=ids.getAttribute('i');
     }
    else {
      alert("עליך לבחור שם סריה קיימת")
    }
  }
  close() {      
this.modalService.closeModal();

    if (this.currentEx != undefined) {
      this.showModalOnClick.hide();
      this.showModalOnClick1.hide();
    }
  }
  save() {

    if (this.expensesForm.valid) {

      this.expensesForm.value.amount = this.expensesForm.value.detail
        .reduce((prev, curr) => prev + Number(curr.price), 0);
      this.expensesService.addExpenses(this.expensesForm.value).subscribe(e => {
        this.expensesService.expensesList.push(this.expensesForm.value)   
        this.modalService.openModal('sucsses-form',{name: 'הוצאה'})
      }, () => {
        console.log("error");
      })
    }
    else {
      alert("חסרים נתונים");
    }
    this.showModalOnClick.hide();
    this.showModalOnClick1.hide();
   
   this.modalService.closeModal()
  }

  update() {

    if (this.expensesForm.valid) {

      if (this.expensesForm.value.detail.length != 0) {
        this.expensesForm.value.amount = this.expensesForm.value.detail
          .reduce((prev, curr) => prev + Number(curr.price), 0);
      }
      else {
        this.expensesForm.value.amount = 0;
      }
      this.expensesService.updateExpenses(this.currentEx.id, this.expensesForm.value).subscribe(e => {
        this.expensesService.getAllExpenses().subscribe(ans => { this.expensesService.expensesList = ans })  
 

        this.modalService.openModal('sucsses-form',{name: 'הוצאה'})
      }, () => {
        console.log("error");
      })
    }
    else {
      alert("חסרים נתונים");
    }
    this.showModalOnClick.hide();
    this.showModalOnClick1.hide();
    this.modalService.closeModal();
  }
  savemodal() {
    this.showModalOnClick.hide();
    this.showModalOnClick1.show();
  }

  cancel() {
    this.showModalOnClick.hide();
    this.showModalOnClick1.show();
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




