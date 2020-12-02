import { ObjectID } from "mongodb";

export class createChecksDto {
    readonly id: string;
    readonly IdSales: ObjectID;
    readonly numCheck: number;
    readonly date: Date;
    readonly sum: number;
    readonly ReceiptOrInvoice: string;

}


