export class Expenses {
    id: string;
    PublicSerialName: string;
    date: Date;
    getchack: boolean;
    InvoiceNumber: number;//מספר חשבונית
    Remarks: string;
    amount : number;///totaldate
    amountPartner: number;

    constructor(p?: string, d?:Date, g?: boolean, i?: number, r?: string, a?: number, ap?: number) {
        this.getchack=g;
        this.date=d;
        this.amountPartner=ap;
        this.amount=a;
        this.Remarks=r;
        this.PublicSerialName=p;
        this.InvoiceNumber=i;

    }
}