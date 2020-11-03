export class Expenses {
    id: string;
    PublicSerialName: string;
    date: Date;
    getchack: string;
    InvoiceNumber: number;//מספר חשבונית
    Remarks: string;
    amount: number;///totaldate
    amountPartner: number;
    detail: [{ ProductName: string, Price: number },
        { ProductName: string, Price: number },
        { ProductName: string, Price: number }];

    constructor(p?: string, d?: Date, g?: string, i?: number, r?: string, a?: number, ap?: number,) {
        this.getchack = g;
        this.date = d;
        this.amountPartner = ap;
        this.amount = a;
        this.Remarks = r;
        this.PublicSerialName = p;
        this.InvoiceNumber = i;

    }
}