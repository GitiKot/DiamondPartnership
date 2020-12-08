import * as mongoose from 'mongoose';

export const CheckSchema = new mongoose.Schema({
//  IdSales:{type:mongoose.Schema.Types.ObjectId,ref:'Sale'},
IdSales:{type:Array,required:true},
 numCheck: { type: Number, required: true },
 date: { type: Date, required: true },
 sum: { type: Number, required: true },
 ReceiptOrInvoice: { type: String, required: true },
 
});

export interface Checks extends mongoose.Document {
    IdSales:Array<string>,
//    IdSales: {type:mongoose.Schema.Types.ObjectId,ref:'Sale'},
   numCheck: number,
   date: Date,
   sum: number,
   ReceiptOrInvoice: string,
}
