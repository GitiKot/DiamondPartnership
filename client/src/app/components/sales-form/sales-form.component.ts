import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sale } from 'src/app/data/sale';
import { Seriousness } from 'src/app/data/seriousness';
import { SalesService } from 'src/app/services/sales.service'
import { seriousnessService } from 'src/app/services/seriousness.service';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.css']
})

export class SalesFormComponent implements OnInit {
  selectedSerial: Seriousness;
  numStones: number;
  tableContent = []
  salesForm: FormGroup;
  salesList: Array<Sale>;
  totalPrice = [];
  dateP: string;
  seriousnessList: Array<Seriousness>;
  serialId;
  place;
  // updateSale:Sale;
  // CurrentNavigation;
  constructor(private router: Router,  private seriousnessService: seriousnessService, private salesServise: SalesService, private cdRef: ChangeDetectorRef) {
// this.CurrentNavigation=this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {

    this.seriousnessService.getAllSeriousness().subscribe(ans => {
      this.seriousnessList = ans;
    });

    this.keypressEnter();
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
      totalPrice: new FormControl(''),
      rawOrPolished: new FormControl('', Validators.required),
      date2: new FormControl(''),
      num: new FormControl(''),
      isOpen: new FormControl(''),
    });

    // var radioRaw= document.getElementById('raw');
    document.getElementById('raw').setAttribute('checked', 'true')
  }
  numStonesFunc() {

    this.tableContent = []

    this.numStones = Number((document.querySelector('#numStones') as HTMLInputElement).value);
    this.addrow();

  }
  selectedSaleId(event){
      let s = event.target.value;
      let ids = document.getElementById(s);
      if (ids) {
      this.serialId= ids.getAttribute('data-value');
      this.place=ids.getAttribute('i');
       }
      else {
        alert("עליך לבחור שם סריה קיימת")
      }
    
  }
  addEventCalcDate() {
    var d = (document.querySelector('#datesale') as HTMLInputElement).value;
    var dateSales = new Date(d)

    var num: number = +(document.querySelector('#numOfDate') as HTMLInputElement).value;
    dateSales.setDate(dateSales.getDate() + num);

    (document.querySelector('#DueDate') as HTMLInputElement).value = dateSales.toLocaleDateString();
  }

  save() {

    let flag = 0;
    // alert("האם הנך בטוח במה שאתה עושה");
    if (this.tableContent[0] != undefined) {
      // console.log(this.tableContent);
      let i = 0;
      this.tableContent.forEach(sale => {

        // this.salesForm.controls['publicSerialName'].setValue(sale.publicSerial);
        this.salesForm.controls['publicSerialName'].setValue(this.serialId)

        this.salesForm.controls['privateSerialName'].setValue(sale.privateSerial)
        this.salesForm.controls['stoneName'].setValue(sale.stoneName)
        this.salesForm.controls['weight'].setValue(sale.w)
        this.salesForm.controls['pricePerCarat'].setValue(sale.pricePerCarat)

        this.salesForm.controls['isOpen'].setValue('true')

        if (this.salesForm.valid) {
          this.salesServise.addSale(this.salesForm.value)
            .subscribe(a => {
               this.seriousnessList[this.place].amountReceived += this.salesForm.controls['weight'].value *
                this.salesForm.controls['pricePerCarat'].value;

              this.seriousnessService.updateSerial(this.serialId.id,this.seriousnessList[this.place])

            });
          i++;
        }
        else {
          alert("חלק מהנתונים אינם נכונים");
          flag = 1;
        }
      });
      if (!flag)
        this.router.navigate(['sales-form/modal-form', 'מכירה'])
      else;
    }
    else {
      alert("לא הוכנסו שורות לטבלה")
    }

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
        event.preventDefault();
        var index = current.getAttribute('tabindex');
        var num = (Number(index));
        num++;
        let nextInput;
        if(num==6){
           nextInput = FindByAttributeValue("tabindex", num, "select");

        }
      else{
         nextInput = FindByAttributeValue("tabindex", num, "input");

      }
        if (nextInput != undefined) {
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
    // var i = document.querySelector('select');
    var i = document.querySelector('input');
    var allInputSimple = document.querySelectorAll('td input');
    
    const allInput = Array.from(allInputSimple);
    allInput.push(i);
   
    allInput.forEach(a => a.addEventListener("keypress", function (event) {
      if ((event as KeyboardEvent)
        .code === "Enter") {
        

        var current = (event.target as Element);

        event.preventDefault();
        var index = current.getAttribute('tabindex');
        var num = (Number(index));
        num++;
        let nextInput = FindByAttributeValue("tabindex", num, "input");
        if (nextInput != undefined) {
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
        w: null,
        pricePerCarat: null

      })

    }

  }
  // ngAfterContentChecked() {

  //   this.cdRef.detectChanges()

  // }

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
  //למחוק את הפונ  אם הכל עובד טוב!! בעז"ה

}