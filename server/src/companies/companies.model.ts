import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
nameCompany:{ type: String, required: true },
 password: { type: String, required: true },
 
 
});

export interface Companies extends mongoose.Document {
    nameCompany: string,
    password: string,
 
}
