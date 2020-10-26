import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { Sale } from 'src/app/data/sale';
import { SalesService } from'src/app/services/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  salesForm: FormGroup;
   isSalesPage=this.route.snapshot.paramMap.get('isSales');
  constructor(private r: Router, private saleService: SalesService,private route:ActivatedRoute) { }
  salesList:Array<Sale>;
 
  ngOnInit(): void {
    // this.salesForm = new FormGroup({});
  this.saleService.getAllSales().subscribe(ans=>this.salesList=ans);
  
  this.salesForm = new FormGroup({
    contactFormModalDate: new FormControl('', Validators.required),
    contactFormModalNumdate: new FormControl('', Validators.required),
    contactFormModalGetchack: new FormControl('', Validators.required),
    contactFormModalInvoiceNumber: new FormControl('', Validators.required),
    contactFormModalPublicSerialName: new FormControl('', Validators.required),
    contactFormModalPrivateSerialName: new FormControl('', Validators.required),
    contactFormModalStoneName: new FormControl('', Validators.required),
    contactFormModalWeight: new FormControl('', Validators.required),
    contactFormModalPricePerCarat: new FormControl('', Validators.required),
    contactFormModalTotalPrice: new FormControl('', Validators.required),
    contactFormModalRawOrPolished: new FormControl('', Validators.required)
  });
   
  }
 
  keypressevt() {
    // /do func to give the seria
  }
  searchPrivate() {

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("private");
    filter = input.value.toUpperCase();
    table = document.getElementById("salesTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[4];
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

  get contactFormModelDate(){
    return this.salesForm.get('contactFormModelDate');
  }
  get contactFormModalNumdate(){
    return this.salesForm.get('contactFormModalNumdate');
  }
  get contactFormModalGetchack(){
    return this.salesForm.get('contactFormModalGetchack');
  }
  get contactFormModalInvoiceNumber(){
    return this.salesForm.get('contactFormModalInvoiceNumber');
  }
  get contactFormModalPublicSerialName(){
    return this.salesForm.get('contactFormModalPublicSerialName');
  }
  get contactFormModalPrivateSerialName(){
    return this.salesForm.get('contactFormModalPrivateSerialName');
  }
  
    get contactFormModalStoneName() {
      return this.salesForm.get('contactFormModalStoneName');
    }
  
    get contactFormModalWeight() {
      return this.salesForm.get('contactFormModalWeight');
    }
  
    get contactFormModalPricePerCarat() {
      return this.salesForm.get('contactFormModalPricePerCarat');
    }
  
    get contactFormModalTotalPrice() {
      return this.salesForm.get('contactFormModalTotalPrice');
    }
    get contactFormModalRawOrPolished() {
      return this.salesForm.get('contactFormModalRawOrPolished');
    }

}




