import { Document } from 'mongoose';

export interface Partner extends Document {
    id: string;
    date: Date;
    numdate: string;///totaldate
    getchack: boolean;
    InvoiceNumber: Number;//מספר חשבונית
    PublicSerialName: Number;
    PrivateSerialName: Number;
    StoneName: string;
    Weight: Number;
    PricePerCarat: Number;
    TotalPrice: Number;
    RawOrPolished: string;
} 