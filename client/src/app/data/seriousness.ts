import { Partner } from './partner';

export class Seriousness {
    id: string;
    serialName: string;
    dateBuy: Date;
    partner: Partner;
    privateSeria: Array<{ namePrivate: string, price:number, expenses: Array<{ nameExpenses: string, price: number }> }>;//מספר חשבונית
    cost: number;
    partnersPercent: number;///totaldate
    finishDate: Date;

   

    constructor(s?: string, d?: Date, p?: Partner,
        ps?: Array<{
            namePrivate: string,price:number, expenses:
                Array<{ nameExpenses: string, price: number }>
        }>, c?: number, pp?: number
        , fd?: Date
    ) {
        this.serialName = s;
        this.dateBuy = d;
        this.partner = p;
        this.privateSeria = ps;
        this.cost = c;
        this.partnersPercent = pp;
       
        this.finishDate = fd;
    }
}
