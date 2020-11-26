import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChecksService } from 'src/app/services/checks.service';
import { Checks } from 'src/app/data/checks';
import { SelectionModel } from '@angular/cdk/collections';
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
  //   pins: any[];
  // selectedRow: Number;
  // setClickedRow: Function;






  // displayedColumns = ['select', 'position', 'name', 'weight', 'symbol'];
  // dataSource = new ChecksService.();
  // selection = new SelectionModel<Checks>(true, []);

  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  // const numRows = this.dataSource..length;
  // return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    // this.isAllSelected() ?
    // this.selection.clear() :
    // this.dataSource.data.forEach(row => this.selection.select(row));
  }

  constructor(private salesService: SalesService) { }
  // constructor(private proService: ChecksService) {
  // this.setClickedRow = function (index) {
  // this.selectedRow = index;
  // }
  // }
  ngOnInit() {
    this.salesService.findAllSales("2r").subscribe(ans => (ans.map(sale => {
      console.log("findaillsales not in");
      console.log(sale.publicSerialName == "2r");
      console.log(sale.publicSerialName);
      
      if (sale.publicSerialName == "2r") {
        let i=0;
        console.log("findaillsales in");
        console.log(sale.publicSerialName == "2r");
        console.log(sale.publicSerialName);
        console.log(sale);
        // this.salesList[i]=sale;
        // this.salesList.push(sale);
        
        
        console.log(this.salesList);
      }
    }
    )) )
    // here the table items are called from webapi
    console.log("function");

    // this.proService.getPinnedAlerts().subscribe(res => {
    // this.pins = res;
    // });
  }
  keypressevt() {

  }
}
// Pass the object as paramter to the function and assign the parameter to selectedRow
// (click)="setClickedRow(pin )"
// setClickedRow(pin ){
// this.selectedRow = pin
// }
  // constructor() { }

  // ngOnInit(): void {
  //   this.checksForm=new FormGroup({

  //   })
  // }
  // keypressevt(){

  // }
// }
