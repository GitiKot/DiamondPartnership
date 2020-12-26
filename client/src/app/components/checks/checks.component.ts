import { asNativeElements, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChecksService } from 'src/app/services/checks.service';
import { Checks } from 'src/app/data/checks';
// import { SelectionModel } from '@angular/cdk/collections';
import { SalesService } from 'src/app/services/sales.service';
import { Sale } from 'src/app/data/sale';
@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent implements OnInit {
  checksForm: FormGroup;
  checksList: Array<Checks>;
  OpenSalesList: Array<Sale>;
  ClosedSalesList: Array<Sale>;
  indexC = 0;
  currentChecks: Checks;
  selectedRowIds: Set<string> = new Set<string>();
  // formBuilder: any;
  // masterToggle() {
  // this.isAllSelected() ?
  // this.selection.clear() :
  // this.dataSource.data.forEach(row => this.selection.select(row));
  // }
  constructor(private salesService: SalesService, private checksService: ChecksService) { }
  // constructor(private proService: ChecksService) {
  // this.setClickedRow = function (index) {
  // this.selectedRow = index;
  // }
  // }
  ngOnInit() {

    this.checksForm = new FormGroup({
      date: new FormControl('', Validators.required),
      numCheck: new FormControl('', Validators.required),
      sum: new FormControl('', Validators.required),
      ReceiptOrInvoice: new FormControl('', Validators.required),
      IdSales: new FormArray([]),
    })

    this.OpenSalesList = new Array();
    this.ClosedSalesList = new Array();
    this.salesService.getAllSales().subscribe(ans =>
      ans.find(s => {
        if (s.isOpen == true) {
          this.OpenSalesList.push(s);
        }
        else {
          this.ClosedSalesList.push(s);
        }
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
    console.log("function");
  }

  resetform() {
    this.checksForm.reset();
  }
  updateCi(i: number) {
    this.indexC = i;
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
      // עובר על כל השורות איפה שאי די שווה הוא מעדכן שדה איזאופן לפולס
      let sale: Sale;
      for (let i = 0; i < this.getSelectedRows().length; i++) {
        // this.getSelectedRows().some(() => s.id == this.IdSales.value[i]));
        const result = this.OpenSalesList.filter(s =>
          this.getSelectedRows()[i].id.includes(s.id));
        for (let j = 0; j < this.OpenSalesList.length; j++) {
          if (result[0].id == this.OpenSalesList[j].id) {
            // this.salesService.updateSale(this.OpenSalesList[j].id, {this.OpenSalesList[j].id,});
            // this.OpenSalesList[j].isOpen = false;
            sale = this.OpenSalesList[j];
            sale.isOpen = false;
            this.salesService.updateSale(this.OpenSalesList[j].id, sale);

          }
        }
      }
      // const s = this.OpenSalesList.some((val) => this.getSelectedRows().indexOf(val) !== -1);
      // console.log(s);
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
