import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  expensesForm: FormGroup;
  expensesList: Array<Expenses>;
  @ViewChild('frame2') public showModalOnClick: ModalDirective;//model s
  @ViewChild('frame1') public showModalOnClick1: ModalDirective;//model big

  constructor(private r: Router, private expensesService: ExpensesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.expensesService.getAllExpenses().subscribe(ans => this.expensesList = ans);

    // console.log(this.expensesList);

  }

  myFunction() {
    console.log(this.expensesList);

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
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

  updateEi(i: number) {
    this.indexE = i;
  }
  deleteExpe(e: Expenses) {
    var ex = this.expensesService.deleteExpenses(e);
    console.log(ex);

    this.expensesService.getAllExpenses().subscribe(ans => this.expensesList = ans);

  }
  // deleteSale(sale){
  //   var tt= this.saleService.deletePartner(sale);
  //   console.log( tt);
  //   this.saleService.getAllSales().subscribe(ans => this.salesList = ans);
  // }
  toolbar(i: number) {
   
    let row = document.getElementById("row"+i);
    let del = document.getElementById("del"+i);
   
    row.style.borderColor = " #f1f1f1";
    del.style.display = "inline";
    del.style.visibility = "visible";
    
    
  }
  toolbar1(i: number) {

    let row = document.getElementById("row"+i);
    let del = document.getElementById("del"+i);
   
    row.style.borderColor = "none";
    del.style.display = "none";
    del.style.visibility = "hidden";
  }
}





