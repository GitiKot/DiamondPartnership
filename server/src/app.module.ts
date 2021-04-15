import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PartnersModule } from './partners/partners.module';
import{ SalesModule}from './sales/sales.module'
import { ExpensesModule } from './expenses/expenses.module';
import { ChecksModule } from './checks/checks.module';
import { SeriousnessModule } from './seriousness/seriousness.module';
import { SendEmailModule } from './send-email/send-email.module';
// import { ChecksService } from './checks/checks.service';
// import { ChecksController } from './checks/checks.controller';
// import { SendEmailController } from './send-email/send-email.controller';
// import { SendEmailService } from './send-email/send-email.service';
// import { SendEmailModule } from './send-email/send-email.module';SendEmailModule,

@Module({
  imports: [
    PartnersModule,SalesModule,HttpModule, ExpensesModule,
    ChecksModule,
    SeriousnessModule,
    MongooseModule.forRoot(
        'mongodb://localhost:27017/DiamondPartnership',{useNewUrlParser: true}),
   
  ],
  controllers: [AppController, ],//ChecksController,, SendEmailController
  providers: [AppService, ],//ChecksService,  SendEmailService,
})
export class AppModule {}
