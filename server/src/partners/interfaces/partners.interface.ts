import { Document } from 'mongoose';

export interface Partner extends Document {
    id: string;
    name: string;
    contact: string;
    email: string;
    phone:string;
    fax:string;
    pel:string;
    Remarks:string;
} 