import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sale } from 'src/app/data/sale';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.css']
})
export class SalesFormComponent implements OnInit {
  salesForm: FormGroup;
  salesList:Array<Sale>;
  constructor(private router: Router,private salesService:SalesService) {

   }

  ngOnInit(): void {
    this.salesForm = new FormGroup({ 
      datesale: new FormControl('', Validators.compose([Validators.required,Validators.email])), 
      // PaymentsNumber: new FormControl('', Validators.required),
      numdate: new FormControl('', Validators.required),

      InvoiceNumber: new FormControl('', Validators.required) 
  });  
  }
  
  save() {
    alert("האם הנך בטוח במה שאתה עושה");
    if (this.salesForm.valid) {
      // const s = new Sale();
    //איך שומרים כל מכירה בנפרד -כל שורת input עם כל הנתונים הנוספים.
      this.salesService.addSale(this.salesForm.value)
        .subscribe(a => {
          this.salesList.push(a);
          this.salesForm.reset();
        });
    }
    // this.router.navigate(['']);
  }
  cancel() {
    this.router.navigate(['/sales/true']);

  }
  addrow(){
let svg=document.querySelector('#svg');
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
   cell1.appendChild(svg);
   cell2.appendChild(input2);
   cell3.appendChild(input3);
   cell4.appendChild(input4);
   cell5.appendChild(input5);
   cell6.appendChild(input);
   tablesales.appendChild(row)
      
 }
}
