import * as mongoose from 'mongoose';

export const CheckSchema = new mongoose.Schema({
IdSales:{type:Array,required:true},
 numCheck: { type: Number, required: true },
 date: { type: Date, required: true },
 sum: { type: Number, required: true },
 ReceiptOrInvoice: { type: String, required: true },
 publicSerialName:{type:mongoose.Schema.Types.ObjectId,ref:'Seriousness'},

});

export interface Checks extends mongoose.Document {
    IdSales:Array<string>,
   numCheck: number,
   date: Date,
   sum: number,
   ReceiptOrInvoice: string,
   publicSerialName:{type:mongoose.Schema.Types.ObjectId,ref:'Seriousness'},

}
