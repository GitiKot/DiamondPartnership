import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
});

export interface User extends mongoose.Document {
    userName: String,
    password: String,
}