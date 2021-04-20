import { Injectable } from '@nestjs/common';
import { Email } from './email.model';
import { createEmailDto } from './dto/create-email.dto'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MailService } from '@sendgrid/mail';

@Injectable()
export class EmailService {

    constructor(
        @InjectModel('Email') private readonly emailModel: Model<Email>, private mailService: MailService) { }

    async sendEmail(createEmailDto: createEmailDto): Promise<Email> {
        console.log(createEmailDto);

        console.log(this.mailService.setApiKey(process.env.SENDGRID_API_KEY));

        this.mailService.setApiKey(process.env.SENDGRID_API_KEY);
        // const pathToAttachment = `${__dirname}/o.pdf`;
        // const attachment = fs.readFileSync(pathToAttachment).toString("base64");

        const createEmail = new this.emailModel(createEmailDto);

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
