import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Expenses } from 'src/app/data/expenses';
import{ExpensesService} from 'src/app/services/expenses.service'

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
expensesForm: FormGroup;
expensessList:Array<Expenses>;

  constructor(private r:Router, private expensesService:ExpensesService) { }
  
  ngOnInit(): void {
    
      this.expensesService.getAllExpenses().subscribe(ans => this.expensessList = ans);
  
  
      this.expensesForm = new FormGroup({
        contactFormModalName: new FormControl('', Validators.required),
        contactFormModalDate: new FormControl('', Validators.required),
        contactFormModalGetChack: new FormControl('', Validators.required),
        contactFormModalInvoicing: new FormControl('', Validators.required),
        contactFormModalAmountPartner: new FormControl('', Validators.required),
        contactFormModalMessage: new FormControl('', Validators.required)
      });
    

  }
   myFunction() {
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
  addrow(){
    // let svg=document.querySelector('#svg');
    let tablesales=document.getElementById("myTable");
    let input = document.createElement('input');
    let input2 = document.createElement('input');
    let input3 = document.createElement('input');
    let input4= document.createElement('input');
    let input5 = document.createElement('input');
    // input.setAttribute('type','text');

    input.setAttribute("class","input");
    input.style.border="0";
    input.style.outline="0";
    input.style.outline="none!important";
    input.style.width= "90px";

   
    input2.setAttribute("class","input");
    input2.style.border="0";
    input2.style.outline="0";
    input2.style.outline="none!important";
    input2.style.width= "90px";


    input3.setAttribute("class","input");
    input3.style.border="0";
    input3.style.outline="0";
    input3.style.outline="none!important";
    input3.style.width= "90px";


    input4.setAttribute("class","input");
    input4.style.border="0";
    input4.style.outline="0";
    input4.style.outline="none!important";
    input4.style.width= "90px";



    input5.setAttribute("class","input");
    input5.style.border="0";
    input5.style.outline="0";
    input5.style.outline="none!important";
    input5.style.width= "90px";


    let row = document.createElement('tr');
  
   

    
   let cell1 = row.insertCell(0);
   let cell2 = row.insertCell(1);
   
   let cell3 = row.insertCell(2);
   let cell4 = row.insertCell(3);
   let cell5 = row.insertCell(4);
   let cell6 = row.insertCell(5);
   let cell7 = row.insertCell(6); 
  //  cell1.appendChild(svg);
   cell2.appendChild(input2);
   cell3.appendChild(input3);
   cell4.appendChild(input4);
   cell5.appendChild(input5);
   cell6.appendChild(input);
   tablesales.appendChild(row)
      
 }
  


 
  get contactFormModalName() {
    return this.expensesForm.get('contactFormModalName');
  }
  get contactFormModalDate() {
    return this.expensesForm.get('contactFormModalDate');
  }

  get contactFormModalGetChack() {
    return this.expensesForm.get('contactFormModalGetChack');
  }

  get contactFormModalInvoicing() {
    return this.expensesForm.get('contactFormModalInvoicing');
  }

  get contactFormModalAmountPartner() {
    return this.expensesForm.get('contactFormModalAmountPartner');
  }
  get contactFormModalMessage() {
    return this.expensesForm.get('contactFormModalMessage');
  }
}
