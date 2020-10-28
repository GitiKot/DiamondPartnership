import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sale } from 'src/app/data/sale';
import { SalesService } from 'src/app/services/sales.service'
// import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.css']
})
export class SalesFormComponent implements OnInit {
  salesForm: FormGroup;
  salesList: Array<Sale>;
  // constructor(private router: Router,private salesService:SalesService) {
  //  }
  constructor(private router: Router, private salesServise: SalesService) {

  }

  ngOnInit(): void {
    this.salesForm = new FormGroup({
      date: new FormControl('', Validators.required),
      dateOfPayment: new FormControl('', Validators.required),
      invoiceNumber: new FormControl('', Validators.required),
      publicSerialName: new FormControl('', Validators.required),
      privateSerialName: new FormControl('', Validators.required),
      stoneName: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      pricePerCarat: new FormControl('', Validators.required),
      rawOrPolished: new FormControl('', Validators.required)
    });

  }

  save() {
    console.log(this.salesForm.value);
    
    // alert("האם הנך בטוח במה שאתה עושה");
    var table = document.querySelectorAll('tbody tr');
    table.forEach(tr => {
      var tdList = tr.querySelectorAll('td')
      this.salesForm.controls['publicSerialName'].setValue(tdList[0].querySelector('input').value)
      this.salesForm.controls['privateSerialName'].setValue(tdList[1].querySelector('input').value)
      this.salesForm.controls['stoneName'].setValue(tdList[2].querySelector('input').value)
      this.salesForm.controls['weight'].setValue(tdList[3].querySelector('input').value)
      this.salesForm.controls['pricePerCarat'].setValue(tdList[4].querySelector('input').value)

      if (this.salesForm.valid) {
        console.log(this.salesForm.value);
        this.salesServise.addSale(this.salesForm.value)
          .subscribe(a => {
            console.log("sss");

            this.salesList.push(a);
            this.salesForm.reset();
          });
      }
      else alert("הנתונים לא נכונים")
    });

    // this.router.navigate(['/sales/true']);
  }
  cancel() {
    this.router.navigate(['/sales/true']);

  }
  addrow() {
    let svg = document.querySelector('#svg');
    let tablesales = document.getElementById("tbodySale");
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
    cell1.appendChild(svg);
    cell2.appendChild(input2);
    cell3.appendChild(input3);
    cell4.appendChild(input4);
    cell5.appendChild(input5);
    cell6.appendChild(input);
    tablesales.appendChild(row)

  }
}
