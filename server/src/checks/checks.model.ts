import * as mongoose from 'mongoose';

export const CheckSchema = new mongoose.Schema({
 IdSales:{type:mongoose.Schema.Types.ObjectId,ref:'Sale'},
 numCheck: { type: Number, required: true },
 date: { type: Date, required: true },
 sum: { type: Number, required: true },
 ReceiptOrInvoice: { type: String, required: true },
 
});

export interface Check extends mongoose.Document {
  
   IdSales: {type:mongoose.Schema.Types.ObjectId,ref:'Sale'},
   numCheck: number,
   date: Date,
   sum: number,
   ReceiptOrInvoice: string,
}
