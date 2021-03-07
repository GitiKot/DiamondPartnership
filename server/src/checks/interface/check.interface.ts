// import { ObjectId } from "mongodb";
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface Checks extends Document {
     id: string;
    IdSales:Array<string>,  
     numCheck: number;
     date: Date;
     sum: number;
     ReceiptOrInvoice: string;
     publicSerialName: {type:ObjectId,ref:'Seriousness'};

}