// import { ObjectId } from "mongodb";
import { Document } from 'mongoose';

export interface Checks extends Document {
     id: string;
    IdSales:Array<string>,  
    //  IdSales: ObjectID;
     numCheck: number;
     date: Date;
     sum: number;
     ReceiptOrInvoice: string;
}