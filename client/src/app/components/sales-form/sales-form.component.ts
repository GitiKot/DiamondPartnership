import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sale } from 'src/app/data/sale';
import { Seriousness } from 'src/app/data/seriousness';
import { ModalService } from 'src/app/services/modal.service';
import { SalesService } from 'src/app/services/sales.service'
import { seriousnessService } from 'src/app/services/seriousness.service';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.css']
})

export class SalesFormComponent implements OnInit {
 
  numStones: number;
  salesForm: FormGroup;
  totalPrice = [];
  dateP: string;
  seriousnessList: Array<Seriousness>;
  serialId = [];
  place = [];
  selectPrivateSerial = [];
  constructor( private modalService:ModalService,private router: Router, private seriousnessService: seriousnessService,
    private salesServise: SalesService, private formBuilder: FormBuilder) { }

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
      date2: [''],
      num: [''],
      isOpen: [''],
      rawOrPolished: ['', [Validators.required]],
      newSaleRow: this.formBuilder.array([]),
    });

    this.salesForm.controls['numOfDate'].setValue(60);
    document.getElementById('raw').setAttribute('checked', 'true')
    this.addSale()
  }
  get date() {
    return this.salesForm.get('date');
  }
  get numOfDate() {
    return this.salesForm.get('numOfDate');
  }
  get invoiceNumber() {
    return this.salesForm.get('invoiceNumber');
  }
  get date2() {
    return this.salesForm.get('date2');
  }
  get num() {
    return this.salesForm.get('num');
  }
  get isOpen() {
    return this.salesForm.get('isOpen');
  }
  get rawOrPolished() {
    return this.salesForm.get('rawOrPolished');
  }
  get newSaleRow(): FormArray {
    return this.salesForm.get('newSaleRow') as FormArray
  }
  get publicSerialName() {
    return this.salesForm.get('newSaleRow').get('publicSerialName');
  }
  get privateSerialName() {
    return this.salesForm.get('newSaleRow').get('privateSerialName');
  }
  get stoneName() {
    return this.salesForm.get('newSaleRow').get('stoneName');
  }
  get weight() {
    return this.salesForm.get('newSaleRow').get('weight');
  }
  get pricePerCarat() {
    return this.salesForm.get('newSaleRow').get('pricePerCarat');
  }
  addSale() {
    this.newSaleRow.push(this.newSale());
  }
  newSale(): FormGroup {
    return this.formBuilder.group({
      publicSerialName: '',
      privateSerialName: ['', [Validators.required]],
      stoneName: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      pricePerCarat: ['', [Validators.required]],
      // totalPrice: '',
    }
    )
  }
  removeSale(i: number) {
    this.newSaleRow.removeAt(i);

  }

  // numStonesFunc() {
  //   for (let index = this.newSaleRow.length; index >= 0; index--) {
  //     this.removeSale(index)
  //   }

  //   this.numStones = Number((document.querySelector('#numStones') as HTMLInputElement).value);
  //   for (let i = 0; i < this.numStones; i++) {
  //     this.addSale();
  //   }

  // }
  selectedSaleId(event, i: number) {
    let s = event.target.value;
    let ids = document.getElementById(s);
    if (ids) {
      this.serialId[i] = ids.getAttribute('data-value');
      this.place[i] = ids.getAttribute('i');
    }
    else {
      alert("עליך לבחור שם סריה קיימת")
    }
  }
  selectedPrivate(event, i: number) {
    let p = event.target.value;
    // let ids = document.getElementById(p);
    let publ=this.seriousnessList.find(pub=>pub.id==this.serialId[i]);
    
   if(publ.privateSeria.find(s=>s.namePrivate == p)==undefined)
   alert("סריה פרטית זו לא מופיעה בסריה זו")
    // if (ids) {
    //   this.serialP[i] = ids.getAttribute('data-value');
    //   this.placeP[i] = ids.getAttribute('i');
    // }
    // else {
    //   alert("עליך לבחור שם סריה קיימת")
    // }
  }
  getPrivate(e) {

    this.seriousnessService.findBySerailName(e.target.value).subscribe(ans => {
      this.selectPrivateSerial = ans.privateSeria;
    });


  }
  addEventCalcDate() {
    console.log();
    
    var d = (document.querySelector('#datesale') as HTMLInputElement).value;
    var dateSales = new Date(d)

    var num: number = +(document.querySelector('#numOfDate') as HTMLInputElement).value;
    dateSales.setDate(dateSales.getDate() + num);

    (document.querySelector('#DueDate') as HTMLInputElement).value = dateSales.toLocaleDateString();
  }

  saveSale() {
    var saleToDB = new Sale(), flag = 0;

    if (this.salesForm.valid) {
      saleToDB.date = this.salesForm.value.date;
      saleToDB.invoiceNumber = this.salesForm.value.invoiceNumber;
      saleToDB.isOpen = true
      saleToDB.numOfDate = this.salesForm.value.numOfDate;
      saleToDB.rawOrPolished = this.salesForm.value.rawOrPolished;

      for (let i = 0; i < this.newSaleRow.length; i++) {
        saleToDB.pricePerCarat = this.salesForm.value.newSaleRow[i].pricePerCarat;
        saleToDB.publicSerialName = this.serialId[i];
        saleToDB.privateSerialName = this.salesForm.value.newSaleRow[i].privateSerialName;
        saleToDB.stoneName = this.salesForm.value.newSaleRow[i].stoneName;
        saleToDB.weight = this.salesForm.value.newSaleRow[i].weight;
        saleToDB.pricePerCarat = this.salesForm.value.newSaleRow[i].pricePerCarat;
        this.salesServise.addSale(saleToDB)
          .subscribe(() => {
            this.seriousnessList[this.place[i]].amountReceived = this.salesForm.value.newSaleRow[i].weight *
              this.salesForm.value.newSaleRow[i].pricePerCarat;
              console.log(this.seriousnessList[this.place[i]].amountReceived );
              
            this.seriousnessService.updateSerial(this.serialId[i], this.seriousnessList[this.place[i]]).subscribe(() => {
            }, () => {
              console.log("error");
            })
          });
      }
    }
    else {
      alert("חלק מהנתונים אינם נכונים");
      flag = 1;
    }

    if (!flag)
    this.modalService.openModal('sucsses-form','מכירה')
    else;
  }

  cancel() {
    this.modalService.closeModal();

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

}