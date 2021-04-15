import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailService } from './send-email.service';

export class createEmailDto {
    readonly id: string;
    readonly recipientsEmail: string;
}


@Controller('sendEmail')
export class SendEmailController {
    constructor(private sendEmailService: SendEmailService) {

    }
    @Post()
    async sendEmail(@Body() createEmailDto: createEmailDto) {
        try {
            console.log("email");
            const email = await this.sendEmailService.sendEmail(createEmailDto);
            console.log(email);
            
            return email;
        }
        catch
        (err) {
            console.log("failed to send", err);

        }

    }
}

