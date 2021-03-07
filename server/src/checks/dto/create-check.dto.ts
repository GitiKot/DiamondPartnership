// import { ObjectID } from "mongodb";

import { ObjectID } from "mongodb";

export class createChecksDto {
    readonly id: string;
    readonly IdSales: Array<string>;
    readonly numCheck: number;
    readonly date: Date;
    readonly sum: number;
    readonly ReceiptOrInvoice: string;
    readonly publicSerialName: ObjectID;

}


