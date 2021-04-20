import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailService } from '@sendgrid/mail';
import { EmailController } from './email.controller';
import { EmailSchema } from './email.model';
import { EmailService } from './email.service';

@Module({
    imports:[MongooseModule.forFeature([{name:'Email',schema:EmailSchema}])
    
],
controllers:[EmailController],
providers:[EmailService,MailService],


})
export class EmailModule {}
