import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from 'src/app/data/sale';
import { Seriousness } from 'src/app/data/seriousness';
import { ModalService } from 'src/app/services/modal.service';
import { SalesService } from 'src/app/services/sales.service';
import { seriousnessService } from 'src/app/services/seriousness.service';
import { ModalDirective } from 'angular-bootstrap-md/lib/free/modals/modal.directive';


@Component({
  selector: 'app-sales-update',
  templateUrl: './sales-update.component.html',
  styleUrls: ['./sales-update.component.css']
})
export class SalesUpdateComponent implements OnInit {

  @ViewChild('frame') public showModalOnClick: ModalDirective;

  salesForm: FormGroup;
  currectSale: Sale;
  dateper = [];
  dateP: string;
  updateSale: Sale;
  seriousnessList: Array<Seriousness>;
  constructor(private modalService: ModalService, private r: Router, private route: ActivatedRoute, private seriousnessService: seriousnessService, private saleService: SalesService) { }
  salesList: Array<Sale>
  nameSerial: string;
  ngOnInit(): void {
    this.seriousnessService.getAllSeriousness().subscribe(ans => {
      this.seriousnessList = ans;
    });
    this.updateSale = this.modalService.data;
    console.log("this.updateSale", this.updateSale);

    this.salesForm = new FormGroup({
      date: new FormControl('', Validators.required),
      numOfDate: new FormControl('', Validators.required),
      invoiceNumber: new FormControl('', Validators.required),
      publicSerialName: new FormControl('', Validators.required),
      privateSerialName: new FormControl('', Validators.required),
      stoneName: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      pricePerCarat: new FormControl('', Validators.required),
      totalPrice: new FormControl(''),
      rawOrPolished: new FormControl('', Validators.required),
      date2: new FormControl(''),
      num: new FormControl(''),
      isOpen: new FormControl(''),
    });

    this.salesForm.patchValue({
      date: this.updateSale.date,
      numOfDate: this.updateSale.numOfDate,
      invoiceNumber: this.updateSale.invoiceNumber,
      publicSerialName: this.updateSale.publicSerialName,
      privateSerialName: this.updateSale.privateSerialName,
      stoneName: this.updateSale.stoneName,
      weight: this.updateSale.weight,
      pricePerCarat: this.updateSale.pricePerCarat,
      isOpen: this.updateSale.isOpen,
      rawOrPolished: this.updateSale.rawOrPolished,
      totalPrice: Number(this.updateSale.weight) * Number(this.updateSale.pricePerCarat),
    })

  }
  ngAfterViewInit() {
    this.showModalOnClick.show();
  }

  get date() {
    return this.salesForm.get('date');
  }
  get numOfDate() {
    return this.salesForm.get('numOfDate');
  }
  get invoiceNumber() {
    return this.salesForm.get('invoiceNumber');
  }
  get publicSerialName() {
    return this.salesForm.get('publicSerialName');
  }
  get privateSerialName() {
    return this.salesForm.get('privateSerialName');
  }
  get stoneName() {
    return this.salesForm.get('stoneName');
  }
  get weight() {
    return this.salesForm.get('weight');
  }
  get pricePerCarat() {
    return this.salesForm.get('pricePerCarat');
  }
  get isOpen() {
    return this.salesForm.get('isOpen');
  }
  get rawOrPolished() {
    return this.salesForm.get('rawOrPolished');
  }
  close() {
    this.showModalOnClick.hide();
    this.modalService.closeModal();
  }
 
  addEventCalcDate() {
    var d = (document.querySelector('#datesale') as HTMLInputElement).value;
    var dateSales = new Date(d)
    var num: number = +(document.querySelector('#numOfDate') as HTMLInputElement).value;
    dateSales.setDate(dateSales.getDate() + num);

    (document.querySelector('#DueDate') as HTMLInputElement).value = dateSales.toLocaleDateString();
  }

  update() {
    console.log('update');

    if (this.updateSale != undefined) {
      if (this.salesForm.valid) {
        console.log("form", this.updateSale);
        console.log("update form", this.salesForm.value);

        document.getElementById('raw').setAttribute('checked', 'true')
        this.saleService.updateSale(this.updateSale.id, this.salesForm.value).subscribe(() => {


          let ser = <Seriousness>((this.updateSale.publicSerialName) as any)
          console.log("updatesale", this.updateSale);

          let idser;
          this.seriousnessList.forEach(s => {
            if (s.serialName == ser.serialName) {
              idser = s.id;
            }
          });
          ser.amountReceived = ((Number(this.salesForm.value.weight) *
            Number(this.salesForm.value.pricePerCarat))) - ((Number(this.updateSale.weight) *
              Number(this.updateSale.pricePerCarat)));
          console.log("ser.amountReceived", ser.amountReceived);

          this.seriousnessService.updateSerial(idser, ser).subscribe(() => {
          }, () => {
            console.log("error");
          })

          this.modalService.openModal('sucsses-form', { name: 'מכירה' });
          this.salesForm.reset();
        }, () => {
          console.log("error");
        });
      }
      else {
        alert("חסרים נתונים");
      }
    }
    this.modalService.closeModal();
  }
}

