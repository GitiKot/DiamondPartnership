import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { Sale } from 'src/app/data/sale';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  salesForm: FormGroup;
  currectSale:Sale;
  isSalesPage = this.route.snapshot.paramMap.get('isSales');
  //  constructor(private r: Router, private saleService: SalesService,private route:ActivatedRoute) { }

  constructor(private r: Router, private route: ActivatedRoute, private saleService: SalesService) { }
  salesList: Array<Sale>
  nameSerial: string;
  ngOnInit(): void {
    this.salesForm = new FormGroup({});
    // this.saleService.getAllSales().subscribe(ans => this.salesList = ans);

  }
  deleteSale(sale) {
    var div = document.getElementById('alert');
    div.style.visibility = "visible";
    this.currectSale = sale;
  }
  ok(s) {
    console.log("ok");
    
    if (s != '') {
      var tt,input,nameSeria;
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

    row.style.borderColor = " #f1f1f1";
    del.style.display = "inline";
    del.style.visibility = "visible";
  }
  toolbar1(i: number) {

    let row = document.getElementById("row" + i);
    let del = document.getElementById("del" + i);

    row.style.borderColor = "none";
    del.style.display = "none";
    del.style.visibility = "hidden";
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




