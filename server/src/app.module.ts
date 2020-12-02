import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PartnersModule } from './partners/partners.module';
import{ SalesModule}from './sales/sales.module'

import { ExpensesModule } from './expenses/expenses.module';
import { ChecksService } from './checks/checks.service';
import { ChecksController } from './checks/checks.controller';
import { ChecksModule } from './checks/checks.module';

@Module({
  imports: [
    PartnersModule,SalesModule,ExpensesModule,HttpModule,
    MongooseModule.forRoot(
        'mongodb://localhost:27017/DiamondPartnership',{useNewUrlParser: true}),
    ExpensesModule,
    ChecksModule,
  ],
  controllers: [AppController, ChecksController,],
  providers: [AppService, ChecksService, ],
})
export class AppModule {}
