import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Expenses } from 'src/app/data/expenses';
import { ExpensesService } from 'src/app/services/expenses.service'
import {ModalService}from '../../services/modal.service';
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
  newexpensesForm: FormGroup;

  constructor(public modalService:ModalService,  public expensesService: ExpensesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.expensesService.getAllExpenses().subscribe(ans => this.expensesList = ans);
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
 
  updateflag(ex) {
    this.modalService.openModal('expenses-form',ex,'update')
  }
  
  updateEi(i: number) {
    this.indexE = i;
    console.log("this.indexE",this.indexE);
    
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
    this.modalService.openModal('expenses-form');
  }
}





