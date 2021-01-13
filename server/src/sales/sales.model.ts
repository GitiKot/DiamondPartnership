import * as mongoose from 'mongoose';

export const SaleSchema = new mongoose.Schema({

    publicSerialName:{type:mongoose.Schema.Types.ObjectId,ref:'Seriousness'},
    privateSerialName: { type: String, required: true },
    stoneName: { type: String, required: true },
    date: { type: Date, required: true },
    numOfDate: { type: Number, required: true },
    invoiceNumber: { type: Number, required: true },
    weight: { type: Number, required: true },
    pricePerCarat: { type: Number, required: true },
    rawOrPolished: { type: String, required: true },
    isOpen:{type:Boolean,required:true},
    sumPerPartner:{type:Number},
    sum:{type:Number}
});

export interface Sales extends mongoose.Document {
    id: string;
    date: Date;
    numOfDate:number;
    invoiceNumber: Number;//מספר חשבונית
    publicSerialName:{type:mongoose.Schema.Types.ObjectId,ref:'Seriousness'},
    privateSerialName: String;
    stoneName: string;
    weight: Number;
    pricePerCarat: Number;
    rawOrPolished: string;
    isOpen:Boolean;
    sumPerPartner:Number;
    sum:Number
}
