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
import { ModalService } from 'src/app/services/modal.service';
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
  sizeCollum = new Array<number>(11);
  updateCheck: Checks;
  currentChecks: Checks;
  selectedRowIds: Set<string> = new Set<string>();
  serial: Seriousness
  dateper = [];
  arrSale = new Array()

  constructor(private modalService: ModalService, public salesService: SalesService, public checksService: ChecksService,
    private formBuilder: FormBuilder, private seriousnessService: seriousnessService,
  ) { }

  ngOnInit() {
    console.log(this.salesService.OpenSalesList);

    this.checksForm = this.formBuilder.group({
      date: [''],
      numCheck: [''],
      sum: ['', Validators.min(1)],
      ReceiptOrInvoice: ['', Validators.required],
      IdSales: this.formBuilder.array([]),
      publicSerialName: ['', Validators.required]
    })

    if (this.updateCheck != undefined) {

      this.checksForm.patchValue({
        ReceiptOrInvoice: this.updateCheck.ReceiptOrInvoice,
        date: this.updateCheck.date,
        numCheck: this.updateCheck.numCheck,
        sum: this.updateCheck.sum,
      });
      this.checksForm.setControl('IdSales', this.formBuilder.array(this.updateCheck.IdSales));
      // this.checksForm.value.IdSales.forEach(s => {
      //   this.IdSales.push(this.formBuilder.group(s));
      // });
    }
  }
  checkDetailSOpen(c: Checks) {
    let arrSale = [];
    this.salesService.ClosedSalesList.forEach(sale => {
      this.currentChecks.IdSales.forEach(idCeck => {
        if (sale.id == idCeck)
          arrSale.push(sale)
      })
    })
    let data = { check: c, saleList: arrSale }
    this.modalService.openModal('check-details', data)
  }
  // print() {

  //   let printContents = document.getElementById('toPrint').innerHTML;
  //   let originalContents = document.body.innerHTML;
  //   document.body.innerHTML = printContents;

  //   window.print();
  //   document.body.innerHTML = originalContents;

  // }

  //   calcSaleOpenUntilCost() {

  //     let currentSum, apr = this.serial.AmountReceivedPartner;
  //     this.OpenSalesList.forEach(s => {
  //       currentSum = <number>s.weight * <number>s.pricePerCarat;
  // if(currentSum<=this.serial.cost-apr){
  //   this.selectedRowIds.add(s.id)
  // }
  // })
  // }
  opneCheckForm() {
    this.modalService.openModal('check-form')
  }
  calcCheckMoney(): number {
    let sum = 0, currentSum, apr = this.serial.AmountReceivedPartner, flag = false;
    console.log("סכום שהשותף קיבל: ", apr);
    if (this.getSelectedRows().length > 0) {
      this.getSelectedRows().forEach(s => {
        currentSum = <number>s.pricePerCarat * <number>s.weight;
        //אם הסכום של המכירה הנוכחית עדין בקוסט
        if (currentSum <= this.serial.cost - apr) {
          currentSum = currentSum * this.serial.partnersPercent / 100;
          apr += currentSum; this.arrSale.push({ i: s, j: currentSum })
          sum += currentSum;
        }
        //עכשיו אנחנו עוברים את הקוסט!
        else {
          this.untilcost=true;
                    //כבר עברנו בשיק הנוכחי את הקוסט
                    //איך יודעים ? לפי הפלאג או מקרה קצה :שכל בסכום של המכירה הנוכחית כבר ברווח ז"א שעוד לא הבאנו לשותף כלום במכירה הנוכחית 
          if (flag || apr == this.serial.AmountReceivedPartner) {
            currentSum /= 2; apr += currentSum
            this.arrSale.push({ i: s, j: currentSum })
            sum += currentSum;
          }
                    //פעם ראשונה שאנו עוברים את הקוסט ןבאמצע השיק  
          else {
            let forPartner = this.serial.cost - apr;
            sum += forPartner;
            let our = forPartner * (100 - this.serial.partnersPercent) / this.serial.partnersPercent;
            let newSum = (currentSum - (forPartner + our)) / 2;
            let newSale: Sale;
            newSale = s;
            sum += newSum;
            flag = true;
            newSale.sum = (currentSum - forPartner - our);
            this.arrSale.push({ i: newSale, j: newSum })
          }
        }
      })
    }
    else {
      flag = false;
      if (this.serial.cost > this.serial.AmountReceivedPartner) {
        for (let s of this.salesService.OpenSalesList) {
          currentSum = <number>s.pricePerCarat * <number>s.weight;
          if (currentSum <= this.serial.cost - apr) {
            currentSum = currentSum * this.serial.partnersPercent / 100;
            apr += currentSum;
            this.arrSale.push({ i: s, j: currentSum }); sum += currentSum;
            this.selectedRowIds.add(s.id)
          }
          else {
            if (!flag) {
              let forPartner = this.serial.cost - apr;
              sum += forPartner;
              let our = forPartner * (100 - this.serial.partnersPercent) / this.serial.partnersPercent;
              let newSum = (currentSum - (forPartner + our));
              this.arrSale.push({ i: s, j: forPartner })
              this.selectedRowIds.add(s.id)
              let newSale: Sale; newSale = s; flag = true;
              newSale.sum = newSum;
              newSale.pricePerCarat = newSum / 2; newSale.isOpen = true;
              this.salesService.addSale(newSale).subscribe(
                () => {
                  this.salesService.OpenSalesList.push(newSale)
                }, () => {
                  console.log("eer");
                })
            }
            else {
              break;
            }
          }
        }
      }
      else {
        alert("כבר שילמת את הקוסט, עליך לבחור מכירות")
      }
    }
    return sum;
  }

  calcCheckDate(): Date {
    let finalDate: Date; let currMoney: number; let paymentDate: Date;
    let saleDate;
    let totalSumDate = 0; let totalSumMoney = 0;
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
  // else{
  //   alert(" חישוב תאריך אוטומטי עד הקוסט")

  // }

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
  // updateSerial() {
  //   this.serial.AmountReceivedPartner += this.checksForm.controls['sum'].value;
  //   this.seriousnessService.updateSerial(this.serial.id, this.serial).subscribe(() => {

  //     this.chartDatasets = []
  //     this.chartDatasets.push({
  //       data: [
  //         this.serial.cost, this.serial.AmountReceivedPartner, this.serial.cost - this.serial.AmountReceivedPartner, this.serial.amountReceived], label: 'הסכום בדולרים '
  //     })
  //   }, () => {
  //     alert("error")

  //   })
  // }
  // getSalesFromId(): Array<Sale> {
  //   let arr: Array<Sale>;
  //   arr = new Array();
  //   // console.log("curenty check", this.currentChecks);
  //   if (this.currentChecks) {
  //     this.ClosedSalesList.forEach(sale => {
  //       this.currentChecks.IdSales.forEach(idCeck => {
  //         if (sale.id == idCeck)
  //           arr.push(sale)
  //       })
  //     })
  //   }

  //   // console.log("arr", arr);


  //   // this.currentChecks.IdSales.forEach(id => {
  //   //   arr.push(this.ClosedSalesList.find(sale => {
  //   //     sale.id == id
  //   //   }))

  //   // })

  //   // for (let c = 0; c < this.checksList.length; c++) {
  //   //   if (this.checksList[Cid].id == this.checksList[c].id) {
  //   //     //  אולי אפשר לעשות פונ אחרת 
  //   //     let s = 0;
  //   //     while (this.checksList[c].IdSales[s]) {
  //   //       for (let i = 0; i < this.ClosedSalesList.length; i++) {
  //   //         if (this.checksList[c].IdSales[s] == this.ClosedSalesList[i].id) {
  //   //           arr.push(this.ClosedSalesList[i]);
  //   //         }
  //   //       }
  //   //       s++;
  //   //     }
  //   //   }
  //   // }
  //   // console.log("arr", arr);

  //   return arr;
  // }

  createCheck() {

    this.arrSale = [];
    let sale: Sale;
    this.checksForm.controls['sum'].setValue(this.calcCheckMoney())
    this.checksForm.controls['publicSerialName'].setValue(this.serial.id)
    this.checksForm.controls['date'].setValue(this.calcCheckDate())
    for (let index = 0; index < this.getSelectedRows().length; index++) {
      this.checksForm.value.IdSales.push(this.getSelectedRows()[index].id)
      sale = this.getSelectedRows()[index];
    }
    if (this.serial.cost<=this.serial.AmountReceivedPartner&&this.selectedRowIds.size<=0)
    {
      alert("כבר שילמת את הקוסט עליך לבחור מכירות ")
    }
    if (this.untilcost || this.selectedRowIds.size) {
      this.modalService.openModal('check-form', { form: this.checksForm, arrSAle: this.arrSale, serial: this.serial })
    }
    
    
      this.spliceOpenSaleList();
  

  }
  // save() {
  //   if (this.checksForm.valid) {
  //     this.updateSerial();
  //     this.checksService.addChecks(this.checksForm.value).subscribe(c => {
  //       this.checksList.push(c);
  //       // console.log(this.arrSale);

  //       this.arrSale.forEach(w => {
  //         // console.log(w.i);

  //         this.updateSale(w.i, w.j)

  //       })

  //       this.spliceOpenSaleList();
  //     })
  //     this.checksForm.reset();
  //   } else {
  //     alert("חלק מהנתונים לא נכון")
  //     console.log("form check", this.checksForm.value);
  //   }
  // }
  spliceOpenSaleList() {
    console.log("here");

    this.getSelectedRows()
      .forEach(saleChecked => {
        let i = this.salesService.OpenSalesList.indexOf(saleChecked)
        if (i > -1) {
          this.salesService.OpenSalesList.splice(i, 1);
        }
      });
  }
  getSaleBySeria(e) {
    let i = 0;
    this.salesService.OpenSalesList = [];
    this.salesService.ClosedSalesList = [];

    //מיון סוג מכירות 
    this.salesService.findBySerailName(e.target.value).subscribe(ans => {
      ans.forEach(s => {
        if (s.isOpen == true) {
          this.salesService.OpenSalesList.push(s);
          let saleDate = new Date(s.date);
          let d = new Date();
          d.setDate(saleDate.getDate() + s.numOfDate);
          this.dateper[i] = d;
          i++;
        }
        else { this.salesService.ClosedSalesList.push(s); }
      })
      //הכנסת השיקים 
      this.checksService.findBySerailName(e.target.value).subscribe(ans => {
        this.checksService.checkList = ans;
        if (this.checksService.checkList.length > 0)
          this.currentChecks = this.checksService.checkList[0];
      })
    });
    //תביא את הסריה
    this.seriousnessService.findBySerailName(e.target.value).subscribe(ans => {
      this.serial = ans;
      console.log(this.serial);

      // public chartLabels: Array<any> = ['קוסט','ניתן לשותף','נותר לקוסט','סכום התקבל'];

      this.chartDatasets = [];
      if (this.modalService.data) {
        this.chartDatasets.push({
          data: [
            this.modalService.data.serial.cost, this.modalService.data.serial.AmountReceivedPartner, this.modalService.data.serial.cost - this.modalService.data.serial.AmountReceivedPartner, this.modalService.data.serial.amountReceived], label: 'הסכום בדולרים '

        })
      }
      else {
        this.chartDatasets.push({
          data: [
            this.serial.cost, this.serial.AmountReceivedPartner, this.serial.cost - this.serial.AmountReceivedPartner, this.serial.amountReceived], label: 'הסכום בדולרים '

        })

      }


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
      if (this.salesService.OpenSalesList.length == this.getSelectedRows().length) {
        (((document.getElementById('selectAll') as Element) as Input) as CheckboxComponent).checked = false
        this.salesService.OpenSalesList.forEach(s => {
          this.selectedRowIds.delete(s.id)
        })
        cbox.forEach(c => {
          (((c as Element) as Input) as CheckboxComponent).checked = false;
        })
      }
      else {
        this.salesService.OpenSalesList.forEach(s => {
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
    return this.salesService.OpenSalesList.filter(x => this.selectedRowIds.has(x.id));
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
        let currSale = this.salesService.ClosedSalesList.find(s => s.id == idSale)
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
  filterbyCiterion(event, numColumn: number) {
    console.log(numColumn);

    var input, filter, table, tr, td, i, txtValue;
    // input = document.getElementById("publicSerialName");
    filter = event.target.value.toUpperCase();
    // filter = input.value.toUpperCase();
    table = document.getElementById("salesTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[numColumn];
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
  // searchPrivate() {

  //   var input, filter, table, tr, td, i, txtValue;
  //   input = document.getElementById("private");
  //   filter = input.value.toUpperCase();
  //   table = document.getElementById("salesTable");
  //   tr = table.getElementsByTagName("tr");
  //   for (i = 0; i < tr.length; i++) {
  //     td = tr[i].getElementsByTagName("td")[5];
  //     if (td) {
  //       txtValue = td.textContent || td.innerText;
  //       if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //         tr[i].style.display = "";
  //       } else {
  //         tr[i].style.display = "none";
  //       }
  //     }
  //   }
  // }
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
