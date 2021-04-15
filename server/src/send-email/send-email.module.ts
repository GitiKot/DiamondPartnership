import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailService } from '@sendgrid/mail';
import { SendEmailController } from './send-email.controller';
import { EmailSchema, SendEmailService } from './send-email.service';

@Module({
    // imports:[MongooseModule.forFeature([{name:'Sale',schema:SaleSchema},
    // {name:'Seriousness',schema:SeriousnessSchema}]),
// ,MailService

    imports:[
        MongooseModule.forFeature([{ name:'Send-email', schema: EmailSchema}]),
   ],
    controllers:[SendEmailController],
    providers:[SendEmailService ],
})
export class SendEmailModule {}
