import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from 'src/app/data/sale';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  salesForm: FormGroup;
  currectSale: Sale;
  isSalesPage = this.route.snapshot.paramMap.get('isSales');
  dateper = [];
  updateSale:Sale;
  //  constructor(private r: Router, private saleService: SalesService,private route:ActivatedRoute) { }
  constructor(private r: Router, private route: ActivatedRoute, private saleService: SalesService) { }
  salesList: Array<Sale>
  nameSerial: string;
  ngOnInit(): void {
    this.salesForm = new FormGroup({});

  }
 // var d = (document.querySelector('#datesale') as HTMLInputElement).value;
  //   var dateSales = new Date(d)

  //   var num: number = +(document.querySelector('#numOfDate') as HTMLInputElement).value;
  //   dateSales.setDate(dateSales.getDate() + num);

  //   (document.querySelector('#DueDate') as HTMLInputElement).value = dateSales.toLocaleDateString();
  updateModal(s) {
    this.updateSale = s;
    console.log("s ", s);
    console.log(this.updateSale);
    this.r.navigate(['sales-form'],{state:this.updateSale})
    // this.r.navigate(['sales-form',this.updateSale])
    // this.salesForm.patchValue({
      // name: this.updateSale.name,
      // email: this.updateSale.email,
      // contact: this.updateSale.contact,
      // phone: this.updatePartner.phone,
      // pel: this.updatePartner.pel,
      // fax: this.updatePartner.fax,
      // Remarks: this.updatePartner.Remarks,
    // });

  }
  deleteSale(sale) {
    var div = document.getElementById('alert');
    div.style.visibility = "visible";
    this.currectSale = sale;
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




