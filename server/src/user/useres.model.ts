import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({

   
    dateStart: { type: Date, required: true },
    invoiceNumber: { type: Number, required: true },
    
    password: { type: String, required: true },
    AllowingAccess: { type: String, required: true },

});

export interface User extends mongoose.Document {
    id: string;
    dateStart: Date;
    password: string;
    AllowingAccess  : string;

}


