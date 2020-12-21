import { Partner } from './partner';

export class Seriousness {
    id: string;
    serialName: string;
    dateBuy: Date;
    partner: Partner;
    privateSeria: Array<{ namePrivate: string, price:number, expenses: Array<{ nameExpenses: string, price: number }> }>;//מספר חשבונית
    cost: number;
    amountReceived:number;
    partnersPercent: number;///totaldate
    AmountReceivedPartner:number
    finishDate: Date;
    // serialName:  String,
    // dateBuy:Date;
    // partner:{type:mongoose.Schema.Types.ObjectId,ref:'Partner'},
    // privateSeria:Array<{namePrivate:string,price:number,expenses:Array<{nameExpenses:string,price:number}>}>;
    // cost:number;
    // amountReceived:number;
    // partnersPercent:number;
    // AmountReceivedPartner:number
    // finishDate:Date;

constructor(s?: string, d?: Date, p?: Partner,
        ps?: Array<{
            namePrivate: string,price:number, expenses:
                Array<{ nameExpenses: string, price: number }>
        }>, c?: number, ar?:number,pp?: number,arp?:number
        , fd?: Date
    ) {
        this.serialName = s;
        this.dateBuy = d;
        this.partner = p;
        this.privateSeria = ps;
        this.cost = c;
        this.partnersPercent = pp;
       this.amountReceived=ar;
       this.AmountReceivedPartner = arp;
        this.finishDate = fd;
    }
}
