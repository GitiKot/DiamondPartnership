import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md/lib/free/modals/modal.directive';
import { Expenses } from 'src/app/data/expenses';
import { ExpensesService } from 'src/app/services/expenses.service'

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  indexE = 0;
  currentExpenses: Expenses;
  e: Expenses;
  expensesForm: FormGroup;
  expensesList: Array<Expenses>;
  @ViewChild('frame2') public showModalOnClick: ModalDirective;//model s
  @ViewChild('frame1') public showModalOnClick1: ModalDirective;//model big
  newexpensesForm: FormGroup;

  flagupdate = 0;

  constructor(private r: Router, private expensesService: ExpensesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.expensesService.getAllExpenses().subscribe(ans => this.expensesList = ans);
    // console.log(this.expensesList);
    this.expensesService.getAllExpenses()
      .subscribe((data: any[]) => {
        this.newexpensesForm = this.formBuilder.group({
          expenses: this.formBuilder.array(data.map(datum => this.aExpensesFormGroup(datum)))
        });
      });
  }

  private aExpensesFormGroup(datum) {

    return this.formBuilder.group({
      PublicSerialName: this.formBuilder.control({ value: datum.PublicSerialName, disabled: true }),
      date: this.formBuilder.control({ value: datum.date, disabled: true }),
      getchack: this.formBuilder.control({ value: datum.getchack, disabled: true }),
      InvoiceNumber: this.formBuilder.control({ value: datum.InvoiceNumber, disabled: true }),
      amount: this.formBuilder.control({ value: datum.amount, disabled: true }),
      amountPartner: this.formBuilder.control({ value: datum.amountPartner, disabled: true }),
      Remarks: this.formBuilder.control({ value: datum.Remarks, disabled: true }),
      detail: this.formBuilder.control({ value: datum.detail, disabled: true }),

    });
  }
  filterNameSeria() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("publicSerialName");
    filter = input.value.toUpperCase();
    table = document.getElementById("expensesTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  f() {
    this.e = undefined;
    this.flagupdate = 1;
  }
  updateflag(ex) {
    this.e = ex;
    this.flagupdate = 1;
    console.log("updateflag", this.flagupdate);
  }
  updateFromFlag(event) {
    console.log("updatefromflag");
    console.log("evevt", event);
    this.flagupdate = event;
    console.log(this.flagupdate);

  }
  updateEi(i: number) {
    this.indexE = i;
  }
  // נראה לי שאפשר למחוק פונ' זו
  updateExpenses(exid: string, expenses: Expenses) {
    console.log("updateExpenses",expenses);
    console.log(this.expensesList[exid].id);
    expenses.id = this.expensesList[exid].id;

    this.expensesService.updateExpenses(this.expensesList[exid].id, expenses);
  }
  deleteExpe(e) {
    var div = document.getElementById('alert');
    div.style.visibility = "visible";
    this.currentExpenses = e;
  }
  ok(e) {

    if (e != '') {
      var ex = this.expensesService.deleteExpenses(this.currentExpenses);
      this.expensesService.getAllExpenses().subscribe(ans => this.expensesList = ans);
    }
    this.currentExpenses = null;
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
    update.style.visibility = "visible";
    update.style.display = "inline";
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
  newExpenses(){
    this.r.navigate(['expenses-form'])
  }
}





