import { ObjectId } from "mongodb";
import { Document } from 'mongoose';

export interface Check extends Document {
     id: string;
    IdSales:{type:ObjectId,ref:'Sale'},  
    //  IdSales: ObjectID;
     numCheck: number;
     date: Date;
     sum: number;
     ReceiptOrInvoice: string;
}