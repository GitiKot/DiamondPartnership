import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
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
  expensesForm: FormGroup;
  expensesList: Array<Expenses>;
  @ViewChild('frame2') public showModalOnClick: ModalDirective;//model s
  @ViewChild('frame1') public showModalOnClick1: ModalDirective;//model big

  public showModal1(): void {//just big

    this.showModalOnClick1.show();
  }
  public showModal2(): void {//2

    this.showModalOnClick.show();
    this.showModalOnClick1.show();

  }
  public hideModal(): void {//just s

    this.showModalOnClick.hide();

  }
  
  public hideModal2(): void {//2

    this.showModalOnClick.hide();
    this.showModalOnClick1.hide();

  }
  constructor(private r: Router, private expensesService: ExpensesService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.expensesService.getAllExpenses().subscribe(ans => this.expensesList = ans);
    // this.expensesForm = new FormGroup({
    //   PublicSerialName: new FormControl('', Validators.required),
    //   date: new FormControl('', Validators.required),
    //   getchack: new FormControl('', Validators.required),
    //   InvoiceNumber: new FormControl('', Validators.required),
    //   amountPartner: new FormControl('', Validators.required),
    //   detail: new FormArray([
    //     new FormArray([]),
    //     new FormArray([]),
    //   ]),
    //   Remarks: new FormControl('', Validators.required)//requierd?
    // });
// -------------------------------------------------------------------------------
this.expensesForm=this.formBuilder.group({
  PublicSerialName: ['',[Validators.required]],
    date:  ['',[Validators.required]],
    getchack:  ['',[Validators.required]],
    InvoiceNumber:  ['',[Validators.required]],
    amountPartner:  ['',[Validators.required]],
    // account: this.fb.group({
    //   email: ['', Validators.required],
    //   confirm: ['', Validators.required]
    // })
    detail: this.formBuilder.array([{
      expenses: '',
      price:'',
    }]),
    Remarks:  ['',[Validators.required]],//requierd?

})

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
  addrow() {
    // let svg=document.querySelector('#svg');
    let tablesales = document.getElementById("myTable");
    let input = document.createElement('input');
    let input2 = document.createElement('input');
    let input3 = document.createElement('input');
    let input4 = document.createElement('input');
    let input5 = document.createElement('input');
    // input.setAttribute('type','text');

    input.setAttribute("class", "input");
    input.style.border = "0";
    input.style.outline = "0";
    input.style.outline = "none!important";
    input.style.width = "90px";


    input2.setAttribute("class", "input");
    input2.style.border = "0";
    input2.style.outline = "0";
    input2.style.outline = "none!important";
    input2.style.width = "90px";


    input3.setAttribute("class", "input");
    input3.style.border = "0";
    input3.style.outline = "0";
    input3.style.outline = "none!important";
    input3.style.width = "90px";


    input4.setAttribute("class", "input");
    input4.style.border = "0";
    input4.style.outline = "0";
    input4.style.outline = "none!important";
    input4.style.width = "90px";



    input5.setAttribute("class", "input");
    input5.style.border = "0";
    input5.style.outline = "0";
    input5.style.outline = "none!important";
    input5.style.width = "90px";


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

  save() {

    console.log(this.expensesForm.value);

    alert("האם ברצונך לשמור את הנתונים")
    if (this.expensesForm.valid) {
      this.expensesService.addExpenses(this.expensesForm.value).subscribe(e => {
        this.expensesList.push(e);
        
        this.expensesForm.reset();

      })
      
    }
    this.showModalOnClick.hide();
    this.showModalOnClick1.hide();
  }
  savemodal() {

    console.log(this.expensesForm.value.detail);
  
    
    this.showModalOnClick1.show();
    // alert("האם ברצונך לשמור את הנתונים")
    // if (this.expensesForm.valid) {
    //   this.expensesService.addExpenses(this.expensesForm.value).subscribe(e => {
    //     this.expensesList.push(e);
    //     this.expensesForm.reset();
    //     alert("reset");
    //   })
    // }
if(this.expensesForm.value.detail){





}
  }
  // addListItem() {
  //   const control = <FormArray>this.listForm.controls['list_items'];
  //   control.push(this.initListItem());
  // }
  // addNewAlias(){
  //   const fa = (this.fg.get('aliases')as FormArray);
  //   fa.push(this.fb.group({
  //     name: ['', Validators.required]
  //   }));
  // }
  addDetail() {
    const detail = this.expensesForm.controls.detail as FormArray;
    detail.push(this.formBuilder.group({
      expenses: [''],
      price:[''],
    }));
    
  }
  // addDetail() {
  //       // const details = this.expensesForm.get('detail') as FormArray;

  //   const details = this.expensesForm.controls.detail as FormArray;
  //   details.push(this.formBuilder.group({
  //     expenses: [''],
  //     price:[''],
  //   }));
    
  // }
  cancelex() {

    console.log(this.expensesForm.controls);

    //  console.log( this.showModalOnClick.isShown);
    this.expensesForm.reset();
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

  get amountPartner() {
    return this.expensesForm.get('amountPartner');
  }
  // get detail():FormArray {
  //   return this.expensesForm.get('detail')as FormArray;
  // }
  get expenses(){
    return this.expensesForm.get("detail").get('expenses');
  }
  get price(){
    return this.expensesForm.get("detail").get('price');
  }
  get Remarks() {
    return this.expensesForm.get('Remarks');
  }
}
