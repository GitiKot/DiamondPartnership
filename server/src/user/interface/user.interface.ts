import { Document } from 'mongoose';
export interface user extends Document {
     id: string;
     dateStart: Date;
     password: string;
     AllowingAccess  : string;
     
}
