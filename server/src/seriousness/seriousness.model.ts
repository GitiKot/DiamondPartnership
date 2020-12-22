import { SSL_OP_NO_QUERY_MTU } from 'constants';
import * as mongoose from 'mongoose';
import { arch } from 'os';

export const SeriousnessSchema = new mongoose.Schema({
    serialName: { type: String, required: true },
    dateBuy: { type: Date, required: true },
    partner:{type:mongoose.Schema.Types.ObjectId,ref:'Partner'},
    privateSeria:{type:Array},
    cost: { type: Number, required: true },
    amountReceived: { type: Number, required: true },
    partnersPercent: { type: Number ,required:true },
    AmountReceivedPartner: { type: Number,required:true },
    finishDate:{type:Date}
});

export interface Seriousness extends mongoose.Document {
    serialName:  String,
    dateBuy:Date;
    partner:{type:mongoose.Schema.Types.ObjectId,ref:'Partner'},
    privateSeria:Array<{namePrivate:string,price:number,expenses:Array<{nameExpenses:string,price:number}>}>;
    cost:number;
    amountReceived:number;
    partnersPercent:number;
    AmountReceivedPartner:number
    finishDate:Date;
}
