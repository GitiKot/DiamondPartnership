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
  isSalesPage = this.route.snapshot.paramMap.get('isSales');
  //  constructor(private r: Router, private saleService: SalesService,private route:ActivatedRoute) { }

  constructor(private r: Router, private route: ActivatedRoute, private saleService: SalesService) { }
  salesList: Array<Sale>

  ngOnInit(): void {
    this.salesForm = new FormGroup({});
    this.saleService.getAllSales().subscribe(ans => this.salesList = ans);
    // this.partnerService.getAllPartners().subscribe(ans => this.partnersList = ans);

  }
  deleteSale(sale){
    var tt= this.saleService.deleteSale(sale);
    console.log( tt);
    this.saleService.getAllSales().subscribe(ans => this.salesList = ans);
  }
  keypressevt(e) {
    console.log( "esult"+e.target.value);
    
   this.saleService.findBySerailName(e.target.value).subscribe(ans => this.salesList = ans);
  }
  rawOrPolishedFunc(sale:Sale):string{
return sale.rawOrPolished == 'raw'?'גלם':'מלוטש'
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




