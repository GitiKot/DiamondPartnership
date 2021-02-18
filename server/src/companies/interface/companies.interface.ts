import { Document } from 'mongoose';

export interface Companies extends Document {
     id: string;
     nameCompany: string;
     password: string;
     
}