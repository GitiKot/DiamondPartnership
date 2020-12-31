import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md/lib/free/modals/modal.directive';
import { Sale } from 'src/app/data/sale';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  @ViewChild('frame') public hideModalOnClick: ModalDirective;
  salesForm: FormGroup;
  currectSale: Sale;
  isSalesPage = this.route.snapshot.paramMap.get('isSales');
  dateper = [];
  dateP: string;
  updateSale: Sale;
  //  constructor(private r: Router, private saleService: SalesService,private route:ActivatedRoute) { }
  constructor(private r: Router, private route: ActivatedRoute, private saleService: SalesService) { }
  salesList: Array<Sale>
  nameSerial: string;
  ngOnInit(): void {
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
  get publicSerialName() {
    return this.salesForm.get('publicSerialName');
  }
  get privateSerialName() {
    return this.salesForm.get('privateSerialName');
  }
  get stoneName() {
    return this.salesForm.get('stoneName');
  }
  get weight() {
    return this.salesForm.get('weight');
  }
  get pricePerCarat() {
    return this.salesForm.get('pricePerCarat');
  }
  get isOpen() {
    return this.salesForm.get('isOpen');
  }
  get rawOrPolished() {
    return this.salesForm.get('rawOrPolished');
  }
  // var d = (document.querySelector('#datesale') as HTMLInputElement).value;
  //   var dateSales = new Date(d)
  //   var num: number = +(document.querySelector('#numOfDate') as HTMLInputElement).value;
  //   dateSales.setDate(dateSales.getDate() + num);
  //   (document.querySelector('#DueDate') as HTMLInputElement).value = dateSales.toLocaleDateString();
  updateModal(s) {
    if (s.isOpen==false) {
      alert("לא ניתן לעדכן מכירה שסגרו עליה צ'ק");
      this.hideModalOnClick.hide();
    }
    else{
    this.updateSale = s;
    console.log("s ", s);
    console.log(this.updateSale);

    this.salesForm.patchValue({
      date: this.updateSale.date,
      numOfDate: this.updateSale.numOfDate,
      invoiceNumber: this.updateSale.invoiceNumber,
      publicSerialName: this.updateSale.publicSerialName,
      privateSerialName: this.updateSale.privateSerialName,
      stoneName: this.updateSale.stoneName,
      weight: this.updateSale.weight,
      pricePerCarat: this.updateSale.pricePerCarat,
      isOpen: this.updateSale.isOpen,
      rawOrPolished: this.updateSale.rawOrPolished,
      totalPrice: Number(this.updateSale.weight) * Number(this.updateSale.pricePerCarat),
    })
}
  }
  addEventCalcDate() {
    var d = (document.querySelector('#datesale') as HTMLInputElement).value;
    var dateSales = new Date(d)
    var num: number = +(document.querySelector('#numOfDate') as HTMLInputElement).value;
    dateSales.setDate(dateSales.getDate() + num);

    (document.querySelector('#DueDate') as HTMLInputElement).value = dateSales.toLocaleDateString();
  }

  update() {
    // this.updateRawOrPolished();
    if (this.updateSale != undefined) {
      if (this.salesForm.valid) {
       console.log("form",this.updateSale);
       console.log("update form",this.salesForm.value);
       
       document.getElementById('raw').setAttribute('checked', 'true')
          this.saleService.updateSale(this.updateSale.id, this.salesForm.value).subscribe(() => {
            this.r.navigate(['sales-form/modal-form', 'מכירה'])
            this.salesForm.reset();
          }, () => {
            console.log("error");
          });
       
      }
      else {
        alert("חסרים נתונים");
      }
    }

    // let flag = 0;
    // if (this.tableContent[0] != undefined) {
    //   let i = 0;
    //   this.tableContent.forEach(sale => {
    //     this.salesForm.controls['publicSerialName'].setValue(this.selectedSerial.id)
    //     this.salesForm.controls['privateSerialName'].setValue(sale.privateSerial)
    //     this.salesForm.controls['stoneName'].setValue(sale.stoneName)
    //     this.salesForm.controls['weight'].setValue(sale.w)
    //     this.salesForm.controls['pricePerCarat'].setValue(sale.pricePerCarat)
    //     this.salesForm.controls['isOpen'].setValue('true')
    //     if (this.salesForm.valid) {
    //       this.salesServise.addSale(this.salesForm.value)
    //         .subscribe(a => {
    //           this.selectedSerial.amountReceived = this.salesForm.controls['weight'].value *
    //             this.salesForm.controls['pricePerCarat'].value;
    //           this.seriousnessService.updateSerial(this.selectedSerial)
    //         });
    //       i++;
    //     }
    //     else {
    //       alert("חלק מהנתונים לא נכון");
    //       flag = 1;
    //     }
    //   });
    //   if (!flag)
    //     this.router.navigate(['sales-form/modal-form', 'מכירה'])
    //   else;
    // }
  }
  deleteSale(sale) {

    if (sale.isOpen == true) {
      var div = document.getElementById('alert');
      div.style.visibility = "visible";
      this.currectSale = sale;
    }
    else {
      this.currectSale = undefined;
      alert("לא ניתן למחוק מכירה שסגרו עליה צ'ק");
      alert("עליך למחוק מכירה זו בצ'קים סגורים בכדי שתוכלי למחוק מכירה זו.");
    }

  }
  ok(s) {
    console.log("ok");

    if (s != '') {
      var tt, input, nameSeria;
      tt = this.saleService.deleteSale(this.currectSale);
      // console.log(tt);
      input = document.getElementById("public");
      nameSeria = input.value;
      this.saleService.findBySerailName(nameSeria).subscribe(ans => this.salesList = ans);
    }
    this.currectSale = null;
    var div = document.getElementById('alert');
    div.style.visibility = "hidden";
  }
  getSaleBySeria(e) {

    this.saleService.findBySerailName(e.target.value).subscribe(ans => {
      this.salesList = ans;
      let i = 0;
      this.salesList.forEach(sale => {
        let saleDate = new Date(sale.date);
        let d = new Date();
        d.setDate(saleDate.getDate() + sale.numOfDate);
        this.dateper[i] = d;
        i++;
      })
      if (this.salesList.length != 0)
        this.nameSerial = e.target.value;
      else
        this.nameSerial = undefined;
    });
  }
  rawOrPolishedFunc(sale: Sale): string {
    return sale.rawOrPolished == 'raw' ? 'גלם' : 'מלוטש'
  }
  updateRawOrPolished(){
    let a=document.getElementById('1');
    let b=document.getElementById('2');
    console.log("a",a,"b",b);
    
    
  }
  toolbar(i: number) {

    let row = document.getElementById("row" + i);
    let del = document.getElementById("del" + i);
    let update = document.getElementById("update" + i);
    row.style.borderColor = " #f1f1f1";
    del.style.display = "inline";
    del.style.visibility = "visible";
    update.style.display = "inline";
    update.style.visibility = "visible";
  }
  toolbar1(i: number) {

    let row = document.getElementById("row" + i);
    let del = document.getElementById("del" + i);
    let update = document.getElementById("update" + i);
    row.style.borderColor = "none";
    del.style.display = "none";
    del.style.visibility = "hidden";
    update.style.display = "none";
    update.style.visibility = "hidden";

  }
  searchPrivate() {

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("private");

    filter = input.value.toUpperCase();
    table = document.getElementById("salesTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[5];
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
}




