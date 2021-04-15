import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createEmailDto } from './send-email.controller';
import { MailService } from '@sendgrid/mail';
import * as fs from "fs";

@Injectable()
export class SendEmailService {


    constructor(
        @InjectModel('sendEmail') private readonly sendEmailModel: Model<Email>, private mailService: MailService) { }

    async sendEmail(createEmailDto: createEmailDto): Promise<Email> {
        console.log(createEmailDto);
        
        console.log( this.mailService.setApiKey(process.env.SENDGRID_API_KEY));
        
        this.mailService.setApiKey(process.env.SENDGRID_API_KEY);
        // const pathToAttachment = `${__dirname}/o.pdf`;
        // const attachment = fs.readFileSync(pathToAttachment).toString("base64");

        const createEmail = new this.sendEmailModel(createEmailDto);

        const msg = {
            to: '6762692@gmail.com', // Change to your recipient
            from: '0548510016S@gmail.com', // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            // attachments: [
            //     {
            //         content: attachment,
            //         filename: "attachment.pdf",
            //         type: "application/pdf",
            //         disposition: "attachment"
            //     }
            // ]
        }
        this.mailService.send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
        return createEmail.save();
    }
}

import { Document } from 'mongoose';

export interface Email extends Document {
    id: Date;
    recipientsEmail: string;
}

import * as mongoose from 'mongoose';

export const EmailSchema = new mongoose.Schema({

    recipientsEmail: String
});

export interface Email extends mongoose.Document {
    recipientsEmail: string;
}
