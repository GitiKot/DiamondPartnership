import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
export interface Email extends Document {
    id: string;
    recipientsEmail:string
}
