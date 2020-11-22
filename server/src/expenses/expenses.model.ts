import { SSL_OP_NO_QUERY_MTU } from 'constants';
import * as mongoose from 'mongoose';

export const ExpensesSchema = new mongoose.Schema({
 
    PublicSerialName: { type: String, required: true },
    date: { type: Date, required: true },
    getchack: { type: String, required: true },
    InvoiceNumber: { type: Number, required: true },
    Remarks: { type: String, required: true },
    // detail:Array<{expenses:string,price:number}>,
    detail:{type:Array},
    amount: { type: Number },
    amountPartner: { type: Number },
});

export interface Expenses extends mongoose.Document {
    id: string;
    PublicSerialName: string;
    date: Date;
    getchack: string;
    InvoiceNumber: number;
    detail:Array<{expenses:string,price:number}>;
    Remarks: string;
    amount: number;
    amountPartner: number;
}
