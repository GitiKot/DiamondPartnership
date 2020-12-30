import { asNativeElements, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChecksService } from 'src/app/services/checks.service';
import { Checks } from 'src/app/data/checks';
import { SalesService } from 'src/app/services/sales.service';
import { Sale } from 'src/app/data/sale';
import { ModalDirective } from 'angular-bootstrap-md/lib/free/modals/modal.directive';
import { seriousnessService } from 'src/app/services/seriousness.service';
import { Seriousness } from 'src/app/data/seriousness';
import { CastExpr } from '@angular/compiler';
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
  constructor(private salesService: SalesService, private checksService: ChecksService,
    private formBuilder: FormBuilder, private seriousnessService: seriousnessService) { }

  ngOnInit() {

    this.checksForm = this.formBuilder.group({
      date: [''],
      numCheck: [''],
      sum: [''],
      ReceiptOrInvoice: ['', Validators.required],
      IdSales: this.formBuilder.array([]),
      publicSerialName: ['']
    })
    this.OpenSalesList = new Array();
    this.ClosedSalesList = new Array();
    if (this.updateCheck != undefined) {
      // console.log("updatecheck");
      this.checksForm.patchValue({
        ReceiptOrInvoice: this.updateCheck.ReceiptOrInvoice,
        date: this.updateCheck.date,
        numCheck: this.updateCheck.numCheck,
        sum: this.updateCheck.sum,
      });

      this.checksForm.setControl('IdSales', this.formBuilder.array(this.updateCheck.IdSales));
      this.checksForm.value.IdSales.forEach(s => {
        this.IdSales.push(this.formBuilder.group(s));
      });
    }
  }

  calcCheckDate(): Date {
    let finalDate : Date;
    let paymentDate :Date;    
    let saleDate;
    let totalSumDate = 0;
    let totalSumMoney = 0;
    let currMoney: number;
    
    this.getSelectedRows().forEach(s => {
      currMoney = <number>s.pricePerCarat * <number>s.weight;
      console.log("currMoney:" ,currMoney);
      
      saleDate = new Date(s.date);
      console.log("saleDate: ",saleDate);
      
      paymentDate= new Date(s.date);paymentDate.setDate(paymentDate.getDate()+s.numOfDate)
      console.log("paymentDate: ",paymentDate);

      totalSumMoney += currMoney;
      totalSumDate = totalSumDate + <number>(this.diffDate(paymentDate)) * <number>currMoney;

    });
    console.log(":לסיכום:");
    console.log("totalSumMoney", totalSumMoney);
    console.log("totalSumDate", totalSumDate);

totalSumDate /= totalSumMoney;
finalDate = new Date('01/01/1970 02:00:00')
console.log("finalDate : ",finalDate);
console.log("totalSumMoney : ",totalSumDate);
console.log(typeof(totalSumDate));

finalDate.setDate(finalDate.getDate()+totalSumDate)
    console.log("final ", finalDate);
    return finalDate;

  }

  calcCheckMoney(): number {
    let sum = 0;
    this.getSelectedRows().forEach(s => {
      sum += <number>s.pricePerCarat * <number>s.weight;
    })
    return sum;
  }
  diffDate(d: Date): number {
    d.setHours(2);
    var time = (new Date(d)).getTime() - new Date('01/01/1970 02:00:00').getTime();
    time /= (1000 * 60 * 60 * 24);
    let abs = Math.round(time)
    console.log('time :', abs);
    return abs;
  }
  save() {
    alert("האם הנך בטוח שברצונך לשמור  צ'ק זה ? ");
    if (this.checksForm.valid) {
     
      let sale: Sale;
     
      for (let index = 0; index < this.getSelectedRows().length; index++) {
        this.checksForm.value.IdSales.push(this.getSelectedRows()[index].id)
        sale = this.getSelectedRows()[index];

        sale.isOpen = false;
        this.salesService.updateSale(sale.id, sale);

      }
      this.checksForm.value.publicSerialName = this.getSelectedRows()[0].id;
      this.checksForm.value.date = this.calcCheckDate();
      this.checksForm.value.sum = this.calcCheckMoney();
      console.log("תאריך סופי שיק: ", this.calcCheckDate().toLocaleString());
      console.log("סכום: ", this.calcCheckMoney());


      this.checksService.addChecks(this.checksForm.value).subscribe(c => {
        this.checksList.push(c);

      })
      //   for (let i = 0; i < this.getSelectedRows().length; i++) {
      //     //תוצאה= 
      //     const result = this.OpenSalesList.filter(s =>
      //       this.getSelectedRows()[i].id.includes(s.id));
      //     for (let i = 0; i < this.OpenSalesList.length; i++) {
      //       if (result[0].id == this.OpenSalesList[i].id) {
      //         // this.salesService.updateSale(this.OpenSalesList[j].id, {this.OpenSalesList[j].id,});
      //         // this.OpenSalesList[j].isOpen = false;
      //         sale = this.OpenSalesList[i];
      //         sale.isOpen = false;
      //         sumAllSales += (Number(this.OpenSalesList[i].pricePerCarat) * Number(this.OpenSalesList[i].weight));
      //         this.salesService.updateSale(this.OpenSalesList[i].id, sale);
      //         var dd=new Date()
      //         sale.date= new Date();

      //         dd.setDate(sale.date.getDate() + sale.numOfDate)
      //         sumDate+=this.diff(dateOld,dd)*<number>sale.pricePerCarat*<number>sale.weight;
      //         sumMoney+=<number>sale.weight*<number>sale.pricePerCarat
      //       }
      //       let saleOne = <unknown>this.getSelectedRows()[0].publicSerialName;
      //       serial = <Seriousness>saleOne;
      //                 console.log("good",serial);

      //       if (serial.amountReceived > serial.cost)
      //         sumAllSales /= 2;
      //       else sumAllSales = sumAllSales * serial.partnersPercent / 100;
      //  this.checksForm.value.date =new Date() ;

      //   this.checksForm.value.date.setDate(dateOld.getDate()+sumDate/sumMoney);
      //       this.checksForm.value.sum = sumAllSales;

      //       this.checksForm.value.publicSerialName = serial.id;
      //     }
      //   }



      // this.checksForm.reset();

    } else {
      alert("חלק מהנתונים לא נכון")
    }
  }

  getSaleBySeria(e) {
    this.OpenSalesList = [];
    this.ClosedSalesList = [];
    this.salesService.findBySerailName(e.target.value).subscribe(ans => {
      ans.forEach(s => {
        if (s.isOpen == true) { this.OpenSalesList.push(s); }
        else { this.ClosedSalesList.push(s); }
      })

      this.checksService.findBySerailName(e.target.value).subscribe(ans => {
        console.log(ans);

        this.checksList = ans;
      })
    });
  }
  resetform() {
    this.checksForm.reset();
  }
  updateCi(i: number) {
    this.indexC = i;
  }
  updateModal(ch) {
    this.updateCheck = ch;
    this.showModalOnClick.show();
  }
  update() {

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
  ///   -הוא מכיל את הת"ז של המכירות שנבחרו selectedRowIds יש מערך שנקרא   
  onRowClick(id: string) {
    if (this.selectedRowIds.has(id)) {
      this.selectedRowIds.delete(id);
    }
    else {
      this.selectedRowIds.add(id);
    }
  }
  //האם הת"ז הזו בחורה?
  rowIsSelected(id: string) {
    return this.selectedRowIds.has(id);
  }
  // מחזיר מערך עם  המכירות הפתוחות 
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
