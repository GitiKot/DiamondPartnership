import { Data } from '@angular/router';

export class Sale {
    id: string;

    date: Date;
    invoiceNumber: Number;//מספר חשבונית
    publicSerialName: string;

    privateSerialName: string;
    stoneName: string;
    weight: Number;

    pricePerCarat: Number;
    rawOrPolished: string;
    numOfDate:number;
    isOpen:Boolean;
// invoiceNumber: new FormControl('', Validators.required),
// publicSerialName: new FormControl('', Validators.required),
// privateSerialName: new FormControl('', Validators.required),
// stoneName: new FormControl('', Validators.required),
// weight: new FormControl('', Validators.required),
// pricePerCarat: new FormControl('', Validators.required),
// rawOrPolished: new FormControl('', Validators.required)





    constructor(d?: Date, 
      
        invoice?: Number,
        publicSerial?: string,
        privateSerial?: string,
        stoneName?: string,
        w?: number,
        pricePerCarat?: number,
        numOfDate?:number,
        rawOrPolished?: string,
        isOpen?:boolean)
         {
        this.date = d;
        this.weight = w;
        this.numOfDate=numOfDate;

        this.stoneName = stoneName;
        this.rawOrPolished = rawOrPolished;
        this.publicSerialName = publicSerial;
        
        this.privateSerialName = privateSerial;
        this.pricePerCarat = pricePerCarat;
        this.invoiceNumber = invoice;
       this.isOpen=isOpen;
        
    }
  

}