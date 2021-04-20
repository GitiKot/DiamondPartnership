import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sale } from 'src/app/data/sale';
import { Seriousness } from 'src/app/data/seriousness';
import { ModalService } from 'src/app/services/modal.service';
import { SalesService } from 'src/app/services/sales.service';
import { seriousnessService } from 'src/app/services/seriousness.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  salesForm: FormGroup;
  currectSale: Sale;
  dateper = [];
  updateSale: Sale;
  seriousnessList: Array<Seriousness>;
  constructor(private modalService: ModalService, private seriousnessService: seriousnessService, private saleService: SalesService) { }
  salesList: Array<Sale>
  nameSerial: string;
  ngOnInit(): void {
    this.seriousnessService.getAllSeriousness().subscribe(ans => {
      this.seriousnessList = ans;
    });

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
 
  updateModal(s) {

    this.modalService.openModal('sales-update', s, 'update');

  }

  newSale() {
    // this.modalService.openModal('sales-form');
    this.modalService.changeSaleTab();

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
      let saleDelete = this.currectSale;
      var tt, input, nameSeria;
      tt = this.saleService.deleteSale(this.currectSale)
        .subscribe(() => {
          let ser = <Seriousness>((saleDelete.publicSerialName) as any)
          ser.amountReceived = (Number(saleDelete.weight) *
            Number(saleDelete.pricePerCarat)) * (-1);
          let idser;
          this.seriousnessList.forEach(s => {
            if (s.serialName == ser.serialName) {
              idser = s.id;
            }
          });
          this.seriousnessService.updateSerial(idser, ser).subscribe(() => {
          }, () => {
            console.log("error");
          })
        }, () => {
          console.log("error");
        });
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
      td = tr[i].getElementsByTagName("td")[6];
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




