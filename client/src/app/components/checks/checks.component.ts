import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChecksService } from 'src/app/services/checks.service';
import { Checks } from 'src/app/data/checks';
import { SalesService } from 'src/app/services/sales.service';
import { Sale } from 'src/app/data/sale';
import { ModalDirective } from 'angular-bootstrap-md/lib/free/modals/modal.directive';
import { seriousnessService } from 'src/app/services/seriousness.service';
import { Seriousness } from 'src/app/data/seriousness';
import { CheckboxComponent } from 'angular-bootstrap-md';
@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent implements OnInit {

  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [];

  public chartLabels: Array<any> = ['קוסט', 'ניתן לשותף', 'נותר לקוסט', 'סכום התקבל'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(88, 162, 235, 1)',
        'rgba(54, 55, 235, 1)',
        'rgba(5, 77, 235, 1)',

      ],
      borderWidth: 3,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }




  @ViewChild('framen') public showModalOnClick: ModalDirective;
  checksForm: FormGroup;
  untilcost: boolean
  checksList: Array<Checks>;
  OpenSalesList: Array<Sale>;
  ClosedSalesList: Array<Sale>;
  c: Checks;
  updateCheck: Checks;
  currentChecks: Checks;
  selectedRowIds: Set<string> = new Set<string>();
  serial: Seriousness
  dateper = [];
  constructor(private salesService: SalesService, private checksService: ChecksService,
    private formBuilder: FormBuilder, private seriousnessService: seriousnessService) { }

  ngOnInit() {
    this.checksForm = this.formBuilder.group({
      date: [''],
      numCheck: [''],
      sum: ['',Validators.min(1)],
      ReceiptOrInvoice: ['', Validators.required],
      IdSales: this.formBuilder.array([]),
      publicSerialName: ['', Validators.required]
    })
    this.OpenSalesList = new Array();
    this.ClosedSalesList = new Array();
    if (this.updateCheck != undefined) {

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

  arrSale = new Array()
  //   calcSaleOpenUntilCost() {

  //     let currentSum, apr = this.serial.AmountReceivedPartner;
  //     this.OpenSalesList.forEach(s => {
  //       currentSum = <number>s.weight * <number>s.pricePerCarat;
  // if(currentSum<=this.serial.cost-apr){
  //   this.selectedRowIds.add(s.id)
  // }
  // })
  // }
  calcCheckMoney(): number {

    let sum = 0, currentSum, apr = this.serial.AmountReceivedPartner, flag = false;
    console.log("סכום שהשותף קיבל: ", apr);
    if (this.getSelectedRows().length > 0) {
      this.getSelectedRows().forEach(s => {
        currentSum = <number>s.pricePerCarat * <number>s.weight;

        if (currentSum <= this.serial.cost - apr) {
          //אם מתחת מחלקים באחוזים
          currentSum = currentSum * this.serial.partnersPercent / 100;

          //מעדכנים את הכום של השותף- גדל
          apr += currentSum;
          this.arrSale.push({ i: s, j: currentSum })
          // this.updateSale(s, currentSum);
          sum += currentSum;

        }
        else {
          if (flag) {
            currentSum /= 2;

            // console.log(currentSum);
            apr += currentSum
            this.arrSale.push({ i: s, j: currentSum })
            // this.updateSale(s, currentSum);
            sum += currentSum;
          }
          else {
            let forPartner = this.serial.cost - apr;
            sum += forPartner;
            let our = forPartner * (100 - this.serial.partnersPercent) / this.serial.partnersPercent;
            let newSum = (currentSum - (forPartner + our)) / 2;
            let newSale: Sale;
            newSale = s;
            sum += newSum;

            flag = true;
            // newSale.sumPerPartner = newSum;
            // newSale.isOpen = false;
            newSale.sum = (currentSum - forPartner - our);
            this.arrSale.push({ i: newSale, j: newSum })
            // this.salesService.updateSale(newSale.id, newSale).subscribe();
            // this.ClosedSalesList.push(newSale)
            // console.log("newSAle", newSale);

          }
        }
      })
    }
    else {
      if (this.serial.cost > this.serial.AmountReceivedPartner) {
        alert("עד הקוסט")


        this.OpenSalesList.forEach(s => {
          currentSum = <number>s.pricePerCarat * <number>s.weight;

          if (currentSum <= this.serial.cost - apr) {
            alert("מתחת קוסט")
            //אם מתחת מחלקים באחוזים
            currentSum = currentSum * this.serial.partnersPercent / 100;

            //מעדכנים את הכום של השותף- גדל
            apr += currentSum;
            this.arrSale.push({ i: s, j: currentSum })
            // this.updateSale(s, currentSum);
            sum += currentSum;
            this.selectedRowIds.add(s.id)
          }
          else {
            if (!flag) {


              let forPartner = this.serial.cost - apr;
              sum += forPartner;
              let our = forPartner * (100 - this.serial.partnersPercent) / this.serial.partnersPercent;
              let newSum = (currentSum - (forPartner + our)) / 2;
              let newSale: Sale;
              newSale = s;
              sum += newSum;

              flag = true;
              // newSale.sumPerPartner = newSum;
              // newSale.isOpen = false;
              newSale.sum = (currentSum - forPartner - our);
              this.OpenSalesList.push(newSale)
              // this.arrSale.push({ i: newSale, j: newSum })
              // this.salesService.updateSale(newSale.id, newSale).subscribe();
              // this.ClosedSalesList.push(newSale)
              // console.log("newSAle", newSale);
              console.log("newSAle", newSale);

              this.selectedRowIds.add(newSale.id)

            }
          }
        })
      }}
      return sum;
    }
    calcCheckDate(): Date {
      let finalDate: Date;
      let paymentDate: Date;
      let saleDate;
      let totalSumDate = 0;
      let totalSumMoney = 0;
      let currMoney: number;
      if (this.getSelectedRows().length > 0) {
        this.getSelectedRows().forEach(s => {
          currMoney = <number>s.pricePerCarat * <number>s.weight;
          saleDate = new Date(s.date);
          paymentDate = new Date(s.date); paymentDate.setDate(paymentDate.getDate() + s.numOfDate)
          totalSumMoney += currMoney;
          totalSumDate = totalSumDate + <number>(this.diffDate(paymentDate)) * <number>currMoney;
        });
      }

      totalSumDate /= totalSumMoney;
      finalDate = new Date('01/01/1970 02:00:00')
      finalDate.setDate(finalDate.getDate() + totalSumDate)
      return finalDate;
    }



    diffDate(d: Date): number {
      d.setHours(2);
      var time = (new Date(d)).getTime() - new Date('01/01/1970 02:00:00').getTime();
      time /= (1000 * 60 * 60 * 24);
      let abs = Math.round(time)
      return abs;
    }
    updateSale(sale: Sale, sumperpartner: number) {
      sale.isOpen = false;
      sale.sumPerPartner = sumperpartner;
      this.salesService.updateSale(sale.id, sale).subscribe(() => console.log("sss")
      );
      this.ClosedSalesList.push(sale);

    }
    updateSerial() {
      this.serial.AmountReceivedPartner += this.checksForm.controls['sum'].value;
      this.seriousnessService.updateSerial(this.serial.id, this.serial).subscribe(() => {

        this.chartDatasets = []
        this.chartDatasets.push({
          data: [
            this.serial.cost, this.serial.AmountReceivedPartner, this.serial.cost - this.serial.AmountReceivedPartner, this.serial.amountReceived], label: 'הסכום בדולרים '
        })
      }, () => {
        alert("error")

      })
    }
    getSalesFromId(): Array < Sale > {
      let arr: Array<Sale>;
      arr = new Array();
      // console.log("curenty check", this.currentChecks);
      if(this.currentChecks) {
      this.ClosedSalesList.forEach(sale => {
        this.currentChecks.IdSales.forEach(idCeck => {
          if (sale.id == idCeck)
            arr.push(sale)
        })
      })

    }

    // console.log("arr", arr);


    // this.currentChecks.IdSales.forEach(id => {
    //   arr.push(this.ClosedSalesList.find(sale => {
    //     sale.id == id
    //   }))

    // })

    // for (let c = 0; c < this.checksList.length; c++) {
    //   if (this.checksList[Cid].id == this.checksList[c].id) {
    //     //  אולי אפשר לעשות פונ אחרת 
    //     let s = 0;
    //     while (this.checksList[c].IdSales[s]) {
    //       for (let i = 0; i < this.ClosedSalesList.length; i++) {
    //         if (this.checksList[c].IdSales[s] == this.ClosedSalesList[i].id) {
    //           arr.push(this.ClosedSalesList[i]);
    //         }
    //       }
    //       s++;
    //     }
    //   }
    // }
    // console.log("arr", arr);

    return arr;
  }

  createCheck() {
    this.arrSale = [];
    let sale: Sale;
    for (let index = 0; index < this.getSelectedRows().length; index++) {
      this.checksForm.value.IdSales.push(this.getSelectedRows()[index].id)
      sale = this.getSelectedRows()[index];
    }

    this.checksForm.controls['sum'].setValue(this.calcCheckMoney())
    this.checksForm.controls['publicSerialName'].setValue(this.serial.id)
    this.checksForm.controls['date'].setValue(this.calcCheckDate())

  }
  save() {
    if (this.checksForm.valid) {
      this.updateSerial();
      this.checksService.addChecks(this.checksForm.value).subscribe(c => {
        this.checksList.push(c);
        // console.log(this.arrSale);

        this.arrSale.forEach(w => {
          // console.log(w.i);

          this.updateSale(w.i, w.j)

        })

        this.spliceOpenSaleList();
      })
      this.checksForm.reset();
    } else {
      alert("חלק מהנתונים לא נכון")
      console.log("form check", this.checksForm.value);
    }
  }
  spliceOpenSaleList() {
    this.getSelectedRows()
      .forEach(saleChecked => {
        let i = this.OpenSalesList.indexOf(saleChecked)
        if (i > -1) {
          this.OpenSalesList.splice(i, 1);
        }
      });
  }
  getSaleBySeria(e) {
    let i = 0;
    this.OpenSalesList = [];
    this.ClosedSalesList = [];
    this.salesService.findBySerailName(e.target.value).subscribe(ans => {
      ans.forEach(s => {
        if (s.isOpen == true) {
          this.OpenSalesList.push(s);
          let saleDate = new Date(s.date);
          let d = new Date();
          d.setDate(saleDate.getDate() + s.numOfDate);
          this.dateper[i] = d;
          i++;
        }
        else { this.ClosedSalesList.push(s); }
      })
      this.checksService.findBySerailName(e.target.value).subscribe(ans => {
        this.checksList = ans;
        if (this.checksList.length > 0)
          this.currentChecks = this.checksList[0];
      })
    });
    this.seriousnessService.findBySerailName(e.target.value).subscribe(ans => {
      this.serial = ans;
      // public chartLabels: Array<any> = ['קוסט','ניתן לשותף','נותר לקוסט','סכום התקבל'];
      // 
      this.chartDatasets = [];
      this.chartDatasets.push({
        data: [
          this.serial.cost, this.serial.AmountReceivedPartner, this.serial.cost - this.serial.AmountReceivedPartner, this.serial.amountReceived], label: 'הסכום בדולרים '
      }
      )
      // { data: [1500000, 125000], label: 'הכותרת' }
    })
  }
  resetform() {
    this.checksForm.reset();
  }
  updateCi(c: Checks) {
    this.currentChecks = c;
  }
  updateModal(ch) {
    this.updateCheck = ch;
    this.showModalOnClick.show();
  }
  update() {
    alert("האם ברצונך לשמור את הנתונים")
    if (this.checksForm.valid) {
      // if(this.checksForm.value.detail.length!=0){
      //       this.checksForm.value.amount = this.checksForm.value.detail
      //         .reduce((prev, curr) => prev + Number(curr.price), 0);
      // }
      // else{
      //     this.checksForm.value.sum=0;
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
    if (id == 'all') {
      // if ((((document.getElementById('selectAll') as Element) as Input) as CheckboxComponent).checked == true) {
      //   (((document.getElementById('selectAll') as Element) as Input) as CheckboxComponent).checked = false
      // } 
      let cbox = document.querySelectorAll('td input');
      if (this.OpenSalesList.length == this.getSelectedRows().length) {
        (((document.getElementById('selectAll') as Element) as Input) as CheckboxComponent).checked = false
        this.OpenSalesList.forEach(s => {
          this.selectedRowIds.delete(s.id)
        })
        cbox.forEach(c => {
          (((c as Element) as Input) as CheckboxComponent).checked = false;
        })
      }
      else {
        this.OpenSalesList.forEach(s => {
          this.selectedRowIds.add(s.id)
        })
        cbox.forEach(c => {
          (((c as Element) as Input) as CheckboxComponent).checked = true
        })
      }
    }
    else {
      if (this.selectedRowIds.has(id)) {
        this.selectedRowIds.delete(id);
      }
      else {
        this.selectedRowIds.add(id);
      }
    }
  }
  rowIsSelected(id: string) {
    return this.selectedRowIds.has(id);
  }
  getSelectedRows() {
    return this.OpenSalesList.filter(x => this.selectedRowIds.has(x.id));
  }


  deleteCheck() {

    var div = document.getElementById('alert');
    div.style.visibility = "visible";
    // this.currentChecks = c;
  }

  ok(c) {
    // let s = 0;
    // let sale;
    if (c == 'ok') {
      // console.log("sad", this.currentChecks);

      this.currentChecks.IdSales.forEach(idSale => {
        let currSale = this.ClosedSalesList.find(s => s.id == idSale)
        // console.log("currSale: ", currSale);

        currSale.isOpen = true;
        this.salesService.updateSale(currSale.id, currSale)
        this.checksService.deleteChecks(this.currentChecks);

        let i = this.checksList.indexOf(this.currentChecks)
        if (i > -1) {
          this.checksList.splice(i, 1);
        }
      });

      // while (this.currentChecks.IdSales[s]) {
      //   for (let j = 0; j < this.ClosedSalesList.length; j++) {
      //     if (this.currentChecks.IdSales[s] == this.ClosedSalesList[j].id) {
      //       // this.salesService.updateSale(this.OpenSalesList[j].id, {this.OpenSalesList[j].id,});
      //       // this.OpenSalesList[j].isOpen = false;
      //       sale = this.ClosedSalesList[j];
      //       sale.isOpen = true;
      //       this.salesService.updateSale(this.ClosedSalesList[j].id, sale);
      //     }
      //   } s++;
      // }
      // this.checksService.getAllChecks().subscribe(ans => this.checksList = ans);
    }
    // this.currentChecks = null;
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
