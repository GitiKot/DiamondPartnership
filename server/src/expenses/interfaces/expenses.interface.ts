import { Document } from 'mongoose';

export interface Expenses extends Document {
    id: string;
    PublicSerialName: string;
    date: Date;
    getchack: string;
    InvoiceNumber: number;
    Remarks: string;
    amount: number;
    amountPartner: number;
}