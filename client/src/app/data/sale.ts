import { Data } from '@angular/router';

export class Sale {
    id: string;
    date: Date;
    numdate: Number;///totaldate
    getchack: boolean;
    InvoiceNumber: Number;//מספר חשבונית
    PublicSerialName: String;
    PrivateSerialName: String;
    StoneName: string;
    Weight: Number;
    PricePerCarat: Number;
    TotalPrice: Number;
    RawOrPolished: string;


    constructor(d?: Date, numdate?: Number,
        getchack?: boolean,
        Invoice?: Number,
        PublicSerial?: String,
        PrivateSerial?: String,
        StoneName?: string,
        w?: Number,
        PricePerCarat?: Number,
        TotalPrice?: Number,
        RawOrPolished?: string,) {
        this.date = d;
        this.Weight = w;
        this.TotalPrice = TotalPrice;
        this.StoneName = StoneName;
        this.RawOrPolished = RawOrPolished;
        this.PublicSerialName = PublicSerial;
        this.PrivateSerialName = PrivateSerial;
        this.PricePerCarat = PricePerCarat;
        this.InvoiceNumber = Invoice
        this.getchack = getchack;
        this.numdate = numdate;
    }


}