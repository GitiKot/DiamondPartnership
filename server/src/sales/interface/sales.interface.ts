import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
export interface Partner extends Document {
    id: string;
    date: Date;
    numOfDate:number;
    invoiceNumber: Number;
    publicSerialName: {type:ObjectId,ref:'Seriousness'};
    privateSerialName: Number;
    stoneName: string;
    weight: Number;
    pricePerCarat: Number;
    rawOrPolished: string;
    isOpen:Boolean;
}
