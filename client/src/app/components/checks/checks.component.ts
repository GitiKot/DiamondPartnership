import { Component, OnInit } from '@angular/core';
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
  salesList: Array<Sale>;

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

    this.salesService.getAllSales().subscribe(ans => this.salesList = ans);
    // this.checksService.getAllChecks().subscribe(ans => this.checksList = ans);
    // find all sales according public name
    this.salesService.findAllSales("2r").subscribe(ans => (ans.map(sale => {
      if (sale.publicSerialName == "2r") {//htmlבמקום 2ר לוקחים את מה שנכנס באינפוט מתוך    
        console.log("findaillsales in");
        console.log(sale.publicSerialName == "2r");
        console.log("salelist");
      }
    })))
    // here the table items are called from webapi
    console.log("function");
  }
  keypressevt() {

  }
  resetform() {
    this.checksForm.reset();
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
    return this.salesList.filter(x => this.selectedRowIds.has(x.id));
  }

  save() {
    alert("האם הנך בטוח שברצונך לשמור פרטי צ'ק אלו??");// alert("האם ברצונך לשמור את הנתונים") 
    alert(this.getSelectedRows().length);
    // console.log("this.getSelectedRows()");// console.log(this.getSelectedRows());
    // console.log("this.checksForm.value.IdSales");// console.log(this.checksForm.value.IdSales); 
    console.log(this.checksForm.value);
    console.log(this.checksForm.valid);
    // console.log(this.getSelectedRows().find(s=>{
    //   if(this.rowIsSelected(s.id))
    //  this.salesList.push(s);
    // }));

    if (this.checksForm.valid) {
      for (let i = 0; i < this.getSelectedRows().length; i++) {
        this.checksForm.value.IdSales.push(this.getSelectedRows()[i].id)
      }
      this.checksService.addChecks(this.checksForm.value).subscribe(c => {
        this.checksList.push(c);

      })// this.checksForm.reset();
    }

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
  // get IdSales(){
  // return this.checksForm.get();
  // this.salesList.find({_id:Array(this.IdSales)}).pretty()
  // }
}
