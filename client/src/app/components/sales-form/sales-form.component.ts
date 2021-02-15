import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  tableContent=[];
  // tableContent = Array<{ publicSerialName: string, privateSerialName: string, stoneName: number, weight: number, pricePerCarat: number, isOpen: boolean }>();
  salesForm: FormGroup;
  salesList: Array<Sale>;
  totalPrice = [];
  dateP: string;
  seriousnessList: Array<Seriousness>;
  serialId;
  place;
  // updateSale:Sale;
  // CurrentNavigation;
  constructor(private router: Router, private seriousnessService: seriousnessService,
    private salesServise: SalesService,private formBuilder:FormBuilder, private cdRef: ChangeDetectorRef) {
    // this.CurrentNavigation=this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {

    this.seriousnessService.getAllSeriousness().subscribe(ans => {
      this.seriousnessList = ans;
    });

    this.keypressEnter();
    this.addEventCalcDate();

    this.salesForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      numOfDate: ['', [Validators.required]],
      invoiceNumber: ['', [Validators.required]],
      date2:[''],
      num: [''],
      isOpen: [''],
      rawOrPolished: ['', [Validators.required]],
      newSaleRow: this.formBuilder.array([]),
    });

    // var radioRaw= document.getElementById('raw');
    this.salesForm.controls['numOfDate'].setValue(60);
    document.getElementById('raw').setAttribute('checked', 'true')
  }


  newSale(): FormGroup {
    return this.formBuilder.group({
      publicSerialName: '',
      privateSerialName:['', [Validators.required]],
      stoneName:['', [Validators.required]],
      weight: ['', [Validators.required]],
      pricePerCarat: ['', [Validators.required]],
      totalPrice: '',
     }
    )
  }
  get date() {
    return this.salesForm.get('date');
  }
  get getchack() {
    return this.salesForm.get('getchack');
  }
  get newSaleRow(): FormArray {
    return this.salesForm.get('newSaleRow') as FormArray
  }
  addSale() {
    
    this.newSaleRow.push(this.newSale());
  }

  numStonesFunc() {

    this.tableContent = []

    this.numStones = Number((document.querySelector('#numStones') as HTMLInputElement).value);
    this.addrow();

  }
  selectedSaleId(event) {
    let s = event.target.value;
    let ids = document.getElementById(s);
    if (ids) {
      this.serialId = ids.getAttribute('data-value');
      this.place = ids.getAttribute('i');
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
  rowSale(irow, sale) {
    //לפה זה מגיע טוב רק צריך ללחוץ על השורה ואז
    // או שלא משתמשים באנטר כי זה לא קולט או שמוסיפים עמודה לאישור השורה או לנסות לבדוק עם ה html. 
    console.log("trrow", sale);
    console.log(sale.publicSerial = this.serialId);
    console.log("i", irow);
    for (let t = 0; t < this.tableContent.length; t++) {
      console.log("this.tableContent[irow].salesForm", this.tableContent[irow]);
      sale.publicSerial = this.serialId;
      console.log("ps", sale.publicSerial);
      this.salesForm.value.publicSerialName = this.serialId;
      if (this.tableContent[irow]) {

        this.tableContent[irow].publicSerialName = this.serialId;
        this.tableContent[irow].privateSerialName = sale.privateSerial;
        this.tableContent[irow].stoneName = sale.stoneName;
        this.tableContent[irow].weight = sale.w;
        this.tableContent[irow].pricePerCarat = sale.pricePerCarat;
        this.tableContent[irow].isOpen = true;

      }
      let flag = 0;
      if (this.tableContent[irow] != undefined) {
        // let i = 0;
        // this.tableContent.forEach(sale => {

        // sale.publicSerial = this.serialId;
        // this.salesForm.controls['publicSerialName'].setValue(this.serialId)
        // this.salesForm.controls['privateSerialName'].setValue(sale.privateSerial)
        // this.salesForm.controls['stoneName'].setValue(sale.stoneName)
        // this.salesForm.controls['weight'].setValue(sale.w)
        // this.salesForm.controls['pricePerCarat'].setValue(sale.pricePerCarat)
        // this.salesForm.controls['isOpen'].setValue('true')
        console.log("valid", this.salesForm.value, this.salesForm.valid);
        if (this.salesForm.valid) {
          console.log("valid", this.salesForm.valid);

          this.salesServise.addSale(this.salesForm.value)
            .subscribe(() => {
              this.seriousnessList[this.place].amountReceived = this.salesForm.controls['weight'].value *
                this.salesForm.controls['pricePerCarat'].value;

              this.seriousnessService.updateSerial(this.serialId, this.seriousnessList[this.place]).subscribe(() => {
              }, () => {
                console.log("error");
              })
            });
          // i++;
        }
        else {
          // alert("חלק מהנתונים אינם נכונים");
          flag = 1;
        }
        // });
        if (!flag)
          this.router.navigate(['sales-form/modal-form', 'מכירה'])
        else;
      }
      else {
        alert("לא הוכנסו שורות לטבלה")
      }

    }

    console.log("this.tableContent[i]", this.tableContent);

  }
  save() {
    //לפה זה כבר מגיע  שורה ראשונה בהכפלה
    console.log(this.tableContent);

    let flag = 0;
    // alert("האם הנך בטוח במה שאתה עושה");
    if (this.tableContent[0] != undefined) {
      // console.log(this.tableContent);
      let i = 0;
      this.tableContent.forEach(sale => {
        // this.salesForm.controls['publicSerialName'].setValue(sale.publicSerial);

        // sale.publicSerial = this.serialId;
        this.salesForm.controls['publicSerialName'].setValue(this.serialId)

        this.salesForm.controls['privateSerialName'].setValue(sale.privateSerialName)
        this.salesForm.controls['stoneName'].setValue(sale.stoneName)
        this.salesForm.controls['weight'].setValue(sale.weight)
        this.salesForm.controls['pricePerCarat'].setValue(sale.pricePerCarat)

        this.salesForm.controls['isOpen'].setValue('true')
        if (this.salesForm.valid) {
          this.salesServise.addSale(this.salesForm.value)
            .subscribe(() => {
              this.seriousnessList[this.place].amountReceived = this.salesForm.controls['weight'].value *
                this.salesForm.controls['pricePerCarat'].value;

              this.seriousnessService.updateSerial(this.serialId, this.seriousnessList[this.place]).subscribe(() => {
              }, () => {
                console.log("error");
              })
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
        if (num == 6) {
          nextInput = FindByAttributeValue("tabindex", num, "select");

        }
        else {
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

        publicSerialName: null,
        privateSerialName: null,
        stoneName: null,
        weight:null,
        pricePerCarat: null,
isOpen:true,

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