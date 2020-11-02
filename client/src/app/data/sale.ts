import { Data } from '@angular/router';

export class Sale {
    id: string;

    date: Date;
    invoiceNumber: Number;//מספר חשבונית
    publicSerialName: String;

    privateSerialName: String;
    stoneName: string;
    weight: Number;

    pricePerCarat: Number;
    rawOrPolished: string;
    numOfDate:number;

// invoiceNumber: new FormControl('', Validators.required),
// publicSerialName: new FormControl('', Validators.required),
// privateSerialName: new FormControl('', Validators.required),
// stoneName: new FormControl('', Validators.required),
// weight: new FormControl('', Validators.required),
// pricePerCarat: new FormControl('', Validators.required),
// rawOrPolished: new FormControl('', Validators.required)

    constructor(d?: Date, 
      
        invoice?: Number,
        publicSerial?: String,
        privateSerial?: String,
        stoneName?: string,
        w?: Number,
        pricePerCarat?: Number,
        numOfDate?:number,
        rawOrPolished?: string,)
         {
        this.date = d;
        this.weight = w;
        this.numOfDate=numOfDate;

        this.stoneName = stoneName;
        this.rawOrPolished = rawOrPolished;
        this.publicSerialName = publicSerial;
        
        this.privateSerialName = privateSerial;
        this.pricePerCarat = pricePerCarat;
        this.invoiceNumber = invoice
       
        
    }
  

}