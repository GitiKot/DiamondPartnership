import { Body, Controller,Post } from '@nestjs/common';
import { ObjectID } from 'mongodb';
// import { Patch } from '@nestjs/common/decorators/http/request-mapping.decorator';


import { createEmailDto } from './dto/create-email.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Post()
  async sendEmail(@Body() createEmailDto: createEmailDto) {
    return this.emailService.sendEmail(createEmailDto);
  }


}
