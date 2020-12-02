import { Sale } from './sale';

export class Checks {
    id:string;
    IdSales: Sale;
    numCheck: number;
    date: Date;
    sum: number;
    ReceiptOrInvoice: string;


    constructor(id:string, Id: Sale,
        num: number,d: Date, sum: number, ReceiptOrInvoice: string) {
        this.id=id;
        this.IdSales=Id;
        this.numCheck=num;
        this.date=d;
        this.sum=sum;
       this.ReceiptOrInvoice=ReceiptOrInvoice;
    }
}
