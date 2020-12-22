import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface Seriousness extends Document {
    serialName:  String;
    dateBuy:Date;
    parent:{type:ObjectId,ref:'Partner'},
    partner:string
    privateSeria:Array<{namePrivate:string,price:number,expenses:Array<{nameExpenses:string,exspensesPrice:number}>}>;
    cost:number;
    amountReceived:number;
    partnersPercent:number;
    AmountReceivedPartner:number
    finishDate:Date;
}