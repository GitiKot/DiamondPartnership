import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { Sale } from 'src/app/data/sale';
import { ModalService } from 'src/app/services/modal.service';
import { SalesService } from 'src/app/services/sales.service';
import { seriousnessService } from 'src/app/services/seriousness.service';
import { ChecksService } from '../../services/checks.service'
@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.css']
})
export class CheckFormComponent implements OnInit {

  constructor(private modalService: ModalService, private seriousnessService: seriousnessService, private formBuilder: FormBuilder, private checksService: ChecksService,
    private salesService: SalesService) { }
  @ViewChild('framen') public showModalOnClick: ModalDirective;
  checksForm: FormGroup;

  ngOnInit(): void {
    console.log(this.modalService.data
    );
    this.checksForm = this.formBuilder.group({
      date: [''],
      numCheck: ['', Validators.required],
      sum: ['', Validators.min(1)],
      ReceiptOrInvoice: ['', Validators.required],
      IdSales: this.formBuilder.array([]),
      publicSerialName: ['', Validators.required]
    })

    this.sum.setValue(this.modalService.data.form.value.sum);
    this.date.setValue(this.modalService.data.form.value.date);
    this.modalService.data.form.value.IdSales.forEach(id => {

      this.checksForm.value.IdSales.push(id)
    });
    this.publicSerialName.setValue(this.modalService.data.form.value.publicSerialName)


  }

  ngAfterViewInit() {
    this.showModalOnClick.show();
  }
  closeModal() {
    this.modalService.closeModal();
  }
  updateSale(sale: Sale, sumperpartner: number) {
    sale.isOpen = false;
    sale.sumPerPartner = sumperpartner;
    this.salesService.updateSale(sale.id, sale).subscribe(() => console.log("sss")
    );
    this.salesService.ClosedSalesList.push(sale);

  }
  updateSerial() {
    this.modalService.data.serial.AmountReceivedPartner += this.checksForm.controls['sum'].value;
    this.seriousnessService.updateSerial(this.modalService.data.serial.id, this.modalService.data.serial).subscribe(() => {

      // this.chartDatasets = []
      // this.chartDatasets.push({
      //   data: [
      //     this.modalService.data.serial.cost,  this.modalService.data.serial.AmountReceivedPartner,  this.modalService.data.serial.cost - this.modalService.data.serial.AmountReceivedPartner,  this.modalService.data.serial.amountReceived], label: 'הסכום בדולרים '
      // })
    }, () => {
      alert("error")

    })
  }
  save() {
    console.log("form check", this.checksForm.value);

    if (this.checksForm.valid) {
      this.updateSerial();
      this.checksService.addChecks(this.checksForm.value).subscribe(c => {
        console.log("form check", this.checksForm.value);


        this.modalService.data.arrSAle.forEach(w => {
          this.updateSale(w.i, w.j)
        })
        this.checksService.checkList.push(this.checksForm.value);
        this.spliceOpenSaleList()


        this.modalService.openModal('sucsses-form', { name: 'צק' })
      })
      this.checksForm.reset();
    } else {
      alert("חלק מהנתונים לא נכון")
      console.log("form check", this.checksForm.value);
    }
  }
  spliceOpenSaleList() {

    let name = this.checksForm.value.publicSerialName;
   
    console.log("name", this.modalService.data.serial.serialName);
    
    this.salesService.findBySerailName('aaa').subscribe(ans => {
      ans.forEach(s => {
        if (s.isOpen == true) {
          this.salesService.OpenSalesList.push(s);
          // let saleDate = new Date(s.date);
          // let d = new Date();
          // d.setDate(saleDate.getDate() + s.numOfDate);
          // this.dateper[i] = d;
          // i++;
        }
        else { this.salesService.ClosedSalesList.push(s); }
      })
      console.log("open", this.salesService.OpenSalesList);

    });









  }
  resetform() {
    this.checksForm.reset();
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
  get publicSerialName() {
    return this.checksForm.get('publicSerialName');
  }
  get ReceiptOrInvoice() {
    return this.checksForm.get('ReceiptOrInvoice');
  }
  get IdSales(): FormArray {
    return this.checksForm.get('IdSales') as FormArray;
  }
}
