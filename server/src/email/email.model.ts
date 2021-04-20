import * as mongoose from 'mongoose';

export const EmailSchema = new mongoose.Schema({
     recipientsEmail: {type:String},

    
});

export interface Email extends mongoose.Document {
    id: string;
    recipientsEmail :String,
}
