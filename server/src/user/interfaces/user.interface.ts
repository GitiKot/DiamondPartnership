import { Document } from 'mongoose';

export interface User extends Document {
    id:string;
    userName: String;
    // email:string;
    password: String;
}