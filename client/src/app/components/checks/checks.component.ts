import { asNativeElements, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChecksService } from 'src/app/services/checks.service';
import { Checks } from 'src/app/data/checks';
import { SalesService } from 'src/app/services/sales.service';
import { Sale } from 'src/app/data/sale';
import { ModalDirective } from 'angular-bootstrap-md/lib/free/modals/modal.directive';
@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent implements OnInit {
  @ViewChild('framen') public showModalOnClick: ModalDirective;

  checksForm: FormGroup;
  checksList: Array<Checks>;
  OpenSalesList: Array<Sale>;
  ClosedSalesList: Array<Sale>;
  c: Checks;
  indexC = 0;
  updateCheck: Checks;
  currentChecks: Checks;
  selectedRowIds: Set<string> = new Set<string>();
  // formBuilder: any;
  // masterToggle() {
  // this.isAllSelected() ?
  // this.selection.clear() :
  // this.dataSource.data.forEach(row => this.selection.select(row));
  // }
  // constructor(private proService: ChecksService) {
  // this.setClickedRow = function (index) {
  // this.selectedRow = index;
  // }
  // }
  constructor(private salesService: SalesService, private checksService: ChecksService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.checksForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      numCheck: ['', Validators.required],
      sum: [''],
      ReceiptOrInvoice: ['', Validators.required],
      IdSales: this.formBuilder.array([]),
    })

    this.OpenSalesList = new Array();
    this.ClosedSalesList = new Array();
    this.salesService.getAllSales().subscribe(ans =>
      ans.find(s => {
        if (s.isOpen == true) { this.OpenSalesList.push(s); }
        else { this.ClosedSalesList.push(s); }
      }))

    this.checksService.getAllChecks().subscribe(ans => this.checksList = ans);
    // find all sales according public name
    // let PublicSerialName=document.getElementById("publicSerialName");
    // console.log(PublicSerialName);

    // this.salesService.findAllSales("2r").subscribe(ans => (ans.map(sale => {
    //   if (sale.publicSerialName == "2r") {//htmlבמקום 2ר לוקחים את מה שנכנס באינפוט מתוך    
    //     console.log("findaillsales in");
    //     console.log(sale.publicSerialName == "2r");
    //     console.log("salelist");
    //   }
    // })))
    // here the table items are called from webapi
    // console.log("function");
    
    if (this.updateCheck != undefined) {console.log("updateCheck", this.updateCheck);
      // console.log("updatecheck");
      this.checksForm.patchValue({
        ReceiptOrInvoice: this.updateCheck.ReceiptOrInvoice,
        date: this.updateCheck.date,
        numCheck: this.updateCheck.numCheck,
        sum: this.updateCheck.sum,
      });

      this.checksForm.setControl('IdSales', this.formBuilder.array(this.updateCheck.IdSales));
      console.log("this.IdSales");
      console.log(this.checksForm.value.IdSales)
      this.checksForm.value.IdSales.forEach(s => {
        this.IdSales.push(this.formBuilder.group(s));
        console.log("s", s);
      });
    }
  }

  resetform() {
    this.checksForm.reset();
  }
  updateCi(i: number) {
    this.indexC = i;
  }
  updateModal(ch) {
    this.updateCheck = ch; console.log("flag ", ch);
    this.showModalOnClick.show();
  }
  update() {
    console.log("updateeeeee");
    console.log(this.updateCheck.id);
    console.log(this.checksForm.value);
    alert("האם ברצונך לשמור את הנתונים")
    if (this.checksForm.valid) {
      // console.log("aaaaaaaaaaaaaaaa:",this.sum);
      // console.log("d",this.checksForm.value.detail.length!=0);
      // if(this.checksForm.value.detail.length!=0){
      //       this.checksForm.value.amount = this.checksForm.value.detail
      //         .reduce((prev, curr) => prev + Number(curr.price), 0);
      // }
      // else{
      //     this.checksForm.value.sum=0;
      //   console.log("sss",this.checksForm.value.sum);
      // }
      this.checksService.updateCheck(this.updateCheck.id, this.checksForm.value);
      this.checksForm.reset();
    }
    // this.showModalOnClick.hide();
    // this.showModalOnClick1.hide();
    // צריך פה לעשות רפרש לטבלה
    // this.r.navigate(['']);

  }

  onRowClick(id: string) {

    if (this.selectedRowIds.has(id)) {
      this.selectedRowIds.delete(id);
    }
    else {
      this.selectedRowIds.add(id);
    }
  }

  rowIsSelected(id: string) {
    return this.selectedRowIds.has(id);
  }

  getSelectedRows() {
    return this.OpenSalesList.filter(x => this.selectedRowIds.has(x.id));
  }
  getSalesFromId(Cid: number) {
    let arr: Array<Sale>;
    arr = new Array();
    for (let c = 0; c < this.checksList.length; c++) {
      if (this.checksList[Cid].id == this.checksList[c].id) {
        //  אולי אפשר לעשות פונ אחרת 
        let s = 0;
        while (this.checksList[c].IdSales[s]) {
          for (let i = 0; i < this.ClosedSalesList.length; i++) {
            if (this.checksList[c].IdSales[s] == this.ClosedSalesList[i].id) {
              arr.push(this.ClosedSalesList[i]);
            }
          }
          s++;
        }
      }
    }
    return arr;
  }
  save() {
    alert("האם הנך בטוח שברצונך לשמור פרטי צ'ק אלו??");// alert("האם ברצונך לשמור את הנתונים") 
    if (this.checksForm.valid) {
      for (let i = 0; i < this.getSelectedRows().length; i++) {
        this.checksForm.value.IdSales.push(this.getSelectedRows()[i].id)
      }
      let sale: Sale;
      let sumAllSales = 0;
      for (let i = 0; i < this.getSelectedRows().length; i++) {
        const result = this.OpenSalesList.filter(s =>
          this.getSelectedRows()[i].id.includes(s.id));
        for (let j = 0; j < this.OpenSalesList.length; j++) {
          if (result[0].id == this.OpenSalesList[j].id) {
            // this.salesService.updateSale(this.OpenSalesList[j].id, {this.OpenSalesList[j].id,});
            // this.OpenSalesList[j].isOpen = false;
            sale = this.OpenSalesList[j];
            sale.isOpen = false;
            sumAllSales += (Number(this.OpenSalesList[j].pricePerCarat) * Number(this.OpenSalesList[j].weight));
            this.salesService.updateSale(this.OpenSalesList[j].id, sale);

          }
        }
      }
      console.log("save sum", sumAllSales);

      // const s = this.OpenSalesList.some((val) => this.getSelectedRows().indexOf(val) !== -1);
      // console.log(s);
      this.checksForm.value.sum = sumAllSales;
      this.checksService.addChecks(this.checksForm.value).subscribe(c => {
        this.checksList.push(c);

      })
      // this.checksForm.reset();

    }
  }

  deleteCheck(c: Checks) {

    var div = document.getElementById('alert');
    div.style.visibility = "visible";
    this.currentChecks = c;
  }

  ok(c) {
    let s = 0;
    let sale;
    if (c != '') {

      while (this.currentChecks.IdSales[s]) {
        for (let j = 0; j < this.ClosedSalesList.length; j++) {
          if (this.currentChecks.IdSales[s] == this.ClosedSalesList[j].id) {
            // this.salesService.updateSale(this.OpenSalesList[j].id, {this.OpenSalesList[j].id,});
            // this.OpenSalesList[j].isOpen = false;
            sale = this.ClosedSalesList[j];
            sale.isOpen = true;
            this.salesService.updateSale(this.ClosedSalesList[j].id, sale);
          }
        } s++;
      }
      var ch = this.checksService.deleteChecks(this.currentChecks);
      console.log("ch:", ch);
      this.checksService.getAllChecks().subscribe(ans => this.checksList = ans);
    }
    this.currentChecks = null;
    var div = document.getElementById('alert');
    div.style.visibility = "hidden";
  }
  toolbar(i: number) {

    let row = document.getElementById("row" + i);
    let del = document.getElementById("del" + i);
    let update = document.getElementById("update" + i);
    row.style.borderColor = " #f1f1f1";
    del.style.display = "inline";
    del.style.visibility = "visible";
    update.style.visibility = "visible";
    update.style.display = "inline";

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
  filterNameSeria() {
    // var input, filter, table, tr, td, i, txtValue;
    // input = document.getElementById("publicSerialName");
    // filter = input.value.toUpperCase();
    // table = document.getElementById("checksTable");
    // tr = table.getElementsByTagName("tr");
    // for (i = 0; i < tr.length; i++) {
    //   td = tr[i].getElementsByTagName("td")[2];
    //   if (td) {
    //     txtValue = td.textContent || td.innerText;
    //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //       tr[i].style.display = "";
    //     } else {
    //       tr[i].style.display = "none";
    //     }
    //   }
    // }
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
  get date() {
    return this.checksForm.get('date');
  }
  get numCheck() {
    return this.checksForm.get('numCheck');
  }
  get sum() {
    return this.checksForm.get('sum');
  }
  get ReceiptOrInvoice() {
    return this.checksForm.get('ReceiptOrInvoice');
  }
  get IdSales(): FormArray {
    return this.checksForm.get('IdSales') as FormArray;
  }
}
