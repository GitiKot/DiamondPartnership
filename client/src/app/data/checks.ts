export class Checks {
    IdSales: string;
    numCheck: number;
    date: Date;
    sum: number;
    ReceiptOrInvoice: string;

    constructor(Id: string,
        num: number,d: Date, sum: number, ReceiptOrInvoice: string) {
        this.IdSales=Id;
        this.numCheck=num;
        this.date=d;
        this.sum=sum;
       this.ReceiptOrInvoice=ReceiptOrInvoice;
    }
}