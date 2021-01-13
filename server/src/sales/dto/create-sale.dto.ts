import { ObjectID } from "mongodb";

export declare class createSaleDto {
    readonly id: string;
    readonly date: Date;
    readonly  numOfDate:number;
    readonly invoiceNumber: Number;
    readonly publicSerialName: ObjectID;
    readonly privateSerialName: Number;
    readonly stoneName: string;
    readonly weight: Number;
    readonly pricePerCarat: Number;
    readonly rawOrPolished: string;
    readonly isOpen:Boolean;
    readonly sumPerPartner:Number;
    readonly sum:Number
}
