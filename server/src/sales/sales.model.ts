import * as mongoose from 'mongoose';

export const SaleSchema = new mongoose.Schema({

    publicSerialName: { type: String, required: true },
    privateSerialName: { type: String, required: true },
    stoneName: { type: String, required: true },
    date: { type: Date, required: true },
    numOfDate: { type: Number, required: true },
    // getchack: { type: Boolean, required: true },
    invoiceNumber: { type: Number, required: true },
    weight: { type: Number, required: true },
    pricePerCarat: { type: Number, required: true },
    // TotalPrice: { type: Number, required: true },
    rawOrPolished: { type: String, required: true },
    isOpen:{type:Boolean,required:true},
});
// date: "2020-10-17"
// dateOfPayment: "01/11/202"
// invoiceNumber: "12"
// pricePerCarat: "3"
// privateSerialName: "trtre"
// publicSerialName: "ב"ה"
// rawOrPolished: "polished"
// stoneName: "wertwert"
// weight: "5"
export interface Sales extends mongoose.Document {
    id: string;
    date: Date;
    numOfDate:number;
    invoiceNumber: Number;//מספר חשבונית
    publicSerialName: String;
    privateSerialName: String;
    stoneName: string;
    weight: Number;
    pricePerCarat: Number;
    rawOrPolished: string;
    isOpen:Boolean;
}
