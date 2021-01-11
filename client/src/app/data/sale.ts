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