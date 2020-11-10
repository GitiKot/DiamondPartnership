export class Seriousness {
    id: string;
    serialName: string;
    dateBuy: Date;
    partner: string;
    privateSeria: Array<{ namePrivate: string, price: number, expenses: Array<{ nameExpenses: string, price: number }> }>;//מספר חשבונית
    cost: number;
    amountReceived: number;
    partnersPercent: number;///totaldate
    AmountReceivedPartner: number;
    finishDate: Date;
    /////////

    constructor(s?: string, d?: Date, p?: string,
        ps?: Array<{
            namePrivate: string, price: number, expenses:
                Array<{ nameExpenses: string, price: number }>
        }>, c?: number, ar?: number, pp?: number
        , arp?: number, fd?: Date
    ) {
        this.serialName = s;
        this.dateBuy = d;
        this.partner = p;
        this.privateSeria = ps;
        this.cost = c;
        this.amountReceived = ar;
        this.partnersPercent = pp;
       
        this.AmountReceivedPartner = arp;
        this.finishDate = fd;
    }
}