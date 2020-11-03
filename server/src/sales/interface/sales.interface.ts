import { Document } from 'mongoose';
export interface Partner extends Document {
    id: string;
    date: Date;
    numOfDate:number;
    invoiceNumber: Number;
    publicSerialName: Number;
    privateSerialName: Number;
    stoneName: string;
    weight: Number;
    pricePerCarat: Number;
    rawOrPolished: string;
}
