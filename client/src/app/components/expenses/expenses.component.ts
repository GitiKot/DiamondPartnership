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
    this.expensesForm.reset();
  }
  constructor(private r: Router, private expensesService: ExpensesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.expensesService.getAllExpenses().subscribe(ans =>{this.expensesList = ans ;console.log(ans.forEach(d=>{
      console.log(d.detail);
      
      
    }));
    } );
  
    // this.expensesList.
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
    this.expensesForm = this.formBuilder.group({
      PublicSerialName: ['', [Validators.required]],
      date: ['', [Validators.required]],
      getchack: ['', [Validators.required]],
      InvoiceNumber: ['', [Validators.required]],
      amountPartner: ['', [Validators.required]],
      detail: this.formBuilder.array([]),
      Remarks: ['', [Validators.required]],//requierd?

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
    if (this.expensesForm.value.detail) {





    }
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
    this.detail.reset();
    //  console.log( this.showModalOnClick.isShown);
    // this.expensesForm.reset();
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
   console.log( this.expensesForm[i].detail.length);
  //  for(let e=0;e<this.detail[i].length;e++){
     
  //  }
   
   
   
  }
  // getArrayDetail(ex: number) {
  //   console.log("enter getArrayDetail");
    
  //   for (let e = 0; e < this.expensesForm.value; e++) {
  //     for (let i = 0; i < this.expensesForm.value.detail; i++) {
  //       if (ex == e) {
  //         console.log(this.expensesForm.value.detail[i].expenses);
  //         console.log(this.detail[i].price);
  //       }
  //     }
  //   }
  // }
  //  (ngSubmit)="onSubmit()" לשים ב html  אם רוצים להשתמש בפונ' זו
  // onSubmit() {
  //   console.log(this.expensesForm.value);
  // }


}





