import * as mongoose from 'mongoose';

export const SaleSchema = new mongoose.Schema({

    PublicSerialName: { type: String, required: true },
    PrivateSerialName: { type: String, required: true },
    StoneName: { type: String, required: true },
    date: { type: Date, required: true },
    numdate: { type: Number, required: true },
    getchack: { type: Boolean, required: true },
    InvoiceNumber: { type: Number, required: true },
    Weight: { type: Number, required: true },
    PricePerCarat: { type: Number, required: true },
    TotalPrice: { type: Number, required: true },
    RawOrPolished: { type: String, required: true },

});

export interface Sale extends mongoose.Document {
    id: string;
    date: Date;
    numdate: Number;///totaldate
    getchack: boolean;
    InvoiceNumber: Number;//מספר חשבונית
    PublicSerialName: String;
    PrivateSerialName: String;
    StoneName: string;
    Weight: Number;
    PricePerCarat: Number;
    TotalPrice: Number;
    RawOrPolished: string;
}
