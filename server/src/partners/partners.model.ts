import * as mongoose from 'mongoose';

export const PartnerSchema = new mongoose.Schema({
 
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  fax: { type: String, required: true },
  pel: { type: String, required: true },
  Remarks: { type: String },
});

export interface Partner extends mongoose.Document {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone:string;
  fax:string;
  pel:string;
  Remarks:string;
}
