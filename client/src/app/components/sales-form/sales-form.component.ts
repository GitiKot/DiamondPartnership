import { variable } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectorRef } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
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

  numStones: number;
  tableContent = []
  salesForm: FormGroup;
  salesList: Array<Sale>;
  index: number = 8;
  totalPrice = [];
  dateP: string;
  o = new Object({ "publicSerial": String, "privateSerial": String, "stoneName": String, "w": Number, "pricePerCarat": Number })
  // למה לא עובד האנגולר היפה? בתאריךפרעון ובסכום סופי?
  // constructor(private router: Router,private salesService:SalesService) {
  //  }
  constructor(private router: Router, private salesServise: SalesService, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {


    this.keypressEnter();
    // this.addrow1();
    this.addEventCalcDate();

    this.salesForm = new FormGroup({
      date: new FormControl('', Validators.required),
      numOfDate: new FormControl('', Validators.required),
      invoiceNumber: new FormControl('', Validators.required),
      publicSerialName: new FormControl('', Validators.required),
      privateSerialName: new FormControl('', Validators.required),
      stoneName: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      pricePerCarat: new FormControl('', Validators.required),
      rawOrPolished: new FormControl('', Validators.required)
    });
    

  }
  numStonesFunc() {

    this.tableContent = []

    this.numStones = Number((document.querySelector('#numStones') as HTMLInputElement).value);
    this.addrow();
    
  }

  addEventCalcDate() {


    var d = (document.querySelector('#datesale') as HTMLInputElement).value;
    var dateSales = new Date(d)

    var num: number = +(document.querySelector('#numOfDate') as HTMLInputElement).value;
    dateSales.setDate(dateSales.getDate() + num);
    console.log(dateSales);

    // (document.querySelector('#numOfDate') as HTMLInputElement).value =new Date((document.querySelector('#numOfDate') as HTMLInputElement).value)
    // this.dateP=dateSales.toLocaleDateString();
    (document.querySelector('#DueDate') as HTMLInputElement).value = dateSales.toLocaleDateString();
    // (document.querySelector('#numOfDate') as HTMLInputElement).value +
    //   (document.querySelector('#datesale') as HTMLInputElement).value;
    console.log("as");


  }

  save() {


    alert("האם הנך בטוח במה שאתה עושה");
    if (this.tableContent[0] != undefined) {
      this.tableContent.forEach(sale => {
        this.salesForm.controls['publicSerialName'].setValue(sale.publicSerial);

        this.salesForm.controls['privateSerialName'].setValue(sale.privateSerial)
        this.salesForm.controls['stoneName'].setValue(sale.stoneName)
        this.salesForm.controls['weight'].setValue(sale.w)
        this.salesForm.controls['pricePerCarat'].setValue(sale.pricePerCarat)

        console.log("form:");

        console.log(this.salesForm.value);
        if (this.salesForm.valid) {

          this.salesServise.addSale(this.salesForm.value)
            .subscribe(a => {
              console.log("sss");

              // this.salesList.push(sale);
            });
        }

        else alert("הנתונים לא נכונים")
        //  this.router.navigate(['/sales/true']);

      });
    }
    else {
      alert("לא הוכנסו שורות לטבלה")
    }
    this.salesForm.reset()
  }
  cancel() {
    this.router.navigate(['/sales/true']);

  }
  keypressEnter() {

    var allInput = document.querySelectorAll('input');

    allInput.forEach(a => a.addEventListener("keypress", function (event) {
      if ((event as KeyboardEvent)
        .code === "Enter") {
        var current = (event.target as Element);
        console.log(current);


        event.preventDefault();
        var index = current.getAttribute('tabindex');
        var num = (Number(index));
        num++;
        // let nextInput= document.querySelector('[tabindex=num]');
        let nextInput = FindByAttributeValue("tabindex", num, "input");
        if (nextInput != undefined) {
          // alert(nextInput);
          nextInput.focus();
        }
        else {
          var save = document.getElementById('save');
          save.focus();

        }
        function FindByAttributeValue(attribute, value, element_type) {
          element_type = element_type || "*";
          var All = document.getElementsByTagName(element_type);
          for (var i = 0; i < All.length; i++) {
            if (All[i].getAttribute(attribute) == value) { return All[i]; }
          }
        }
      }
    }, false))
  }
  tableKeyPresent() {
    var allInput = document.querySelectorAll('td input');
  console.log("all input");
  
    console.log(allInput);

    allInput.forEach(a => a.addEventListener("keypress", function (event) {
      if ((event as KeyboardEvent)
        .code === "Enter") {
        var current = (event.target as Element);
        console.log(current);

        // if (current.getAttribute('classNam') == 'PricePerCarat') {
        //   console.log((current as HTMLInputElement).value);
        //   document.getElementsByName('w').forEach(w => {
        //     console.log((w as HTMLInputElement).value);
        //   })

        //   // (document.querySelector('.total') as HTMLInputElement).value= ((
        //   //   document.querySelector('.PricePerCarat') as HTMLInputElement).value)
        //   //   *((document.querySelector('w') as HTMLInputElement).value);
        // }

        event.preventDefault();
        var index = current.getAttribute('tabindex');
        var num = (Number(index));
        num++;
        // let nextInput= document.querySelector('[tabindex=num]');
        let nextInput = FindByAttributeValue("tabindex", num, "input");
        if (nextInput != undefined) {
          // alert(nextInput);
          nextInput.focus();
        }
        else {
          var save = document.getElementById('save');
          save.focus();

        }
        function FindByAttributeValue(attribute, value, element_type) {
          element_type = element_type || "*";
          var All = document.getElementsByTagName(element_type);
          for (var i = 0; i < All.length; i++) {
            if (All[i].getAttribute(attribute) == value) { return All[i]; }
          }
        }
      }
    }, false))
  }
  addrow() {
    for (let i = 0; i < this.numStones; i++) {
      this.tableContent.push({

        publicSerial: null,
        privateSerial: null,
        stoneName: null,
        w: 0,
        pricePerCarat: 0

      })
     
    }

    // console.log("after add ");
    // console.log(this.tableContent);


    // this.tableKeyPresent();

  }
  // ngAfterContentChecked() {

  //   this.cdRef.detectChanges()

  // }
aa(e){
  console.log(Number(e.target.getAttribute('tabindex')));
  
}
  // addrow2() {

  //   this.tableContent.push({
  //     publicSerial: null,
  //     privateSerial: null,
  //     stoneName: null,
  //     w: null,
  //     pricePerCarat: null

  //   });
  //   //  this.cdRef.detectChanges();


  //   //     let svg = document.querySelector('#svg');
  //   //     let tablesales = document.getElementById("tbodySale");

  //   //     let input2 = document.createElement('input');
  //   //     let input3 = document.createElement('input');
  //   //     let input4 = document.createElement('input');
  //   //     let input5 = document.createElement('input');
  //   //     let input = document.createElement('input');
  //   //     input2.setAttribute("class", "input");
  //   //     input2.style.border = "0";
  //   //     input2.style.outline = "0";
  //   //     input2.style.outline = "none!important";
  //   //     input2.style.width = "90px";
  //   //     input2.setAttribute('tabindex', `${this.index}`)
  //   //     this.index++;
  //   //     input3.setAttribute("class", "input");
  //   //     input3.style.border = "0";
  //   //     input3.style.outline = "0";
  //   //     input3.style.outline = "none!important";
  //   //     input3.style.width = "90px";
  //   //     input3.setAttribute('tabindex', `${this.index}`)
  //   //     this.index++;
  //   //     input4.setAttribute("class", "input");
  //   //     input4.style.border = "0";
  //   //     input4.style.outline = "0";
  //   //     input4.style.outline = "none!important";
  //   //     input4.style.width = "90px";
  //   //     input4.setAttribute('tabindex', `${this.index}`)
  //   //     input5.setAttribute('name','w')
  //   //     this.index++;
  //   //     input5.style.border = "0";
  //   //     input5.style.outline = "0";
  //   //     input5.style.outline = "none!important";
  //   //     input5.style.width = "90px";
  //   //     input5.type = "number";
  //   //     input5.setAttribute('tabindex', `${this.index}`)
  //   //     input5.setAttribute('classNam','PricePerCarat')
  //   //     input5.setAttribute('formControlName','w')
  //   // // console.log(input5.getAttribute('classNam'));

  //   //     this.index++;
  //   //     input.style.border = "0";
  //   //     input.style.outline = "0";
  //   //     input.style.outline = "none!important";
  //   //     input.style.width = "90px";
  //   //     input.type = "number"
  //   //     input.setAttribute("myClass", "PricePerCarat")
  //   //     input.setAttribute('tabindex', `${this.index}`)
  //   //     this.index++;
  //   //     // console.log(this.index);

  //   //     let row = document.createElement('tr')
  //   //     let cell1 = row.insertCell(0);
  //   //     let cell2 = row.insertCell(1);
  //   //     let cell3 = row.insertCell(2);
  //   //     let cell4 = row.insertCell(3);
  //   //     let cell5 = row.insertCell(4);
  //   //     let cell6 = row.insertCell(5);
  //   //     // let cell7 = row.insertCell(6);
  //   //     cell1.appendChild(svg);
  //   //     cell2.appendChild(input2);
  //   //     cell3.appendChild(input3);
  //   //     cell4.appendChild(input4);
  //   //     cell5.appendChild(input5);
  //   //     cell6.appendChild(input);
  //   //     tablesales.appendChild(row)




  //   console.log("table");

  //   this.tableContent.forEach(s => {
  //     console.log(s);
  //   })



  // }
  //למחוק את הפונ אם הכל עובד טוב!! בעז"ה

}