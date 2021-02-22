import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PartnersModule } from './partners/partners.module';
import{ SalesModule}from './sales/sales.module'
import { ExpensesModule } from './expenses/expenses.module';
import { ChecksModule } from './checks/checks.module';
import { SeriousnessModule } from './seriousness/seriousness.module';

// import { ChecksService } from './checks/checks.service';
// import { ChecksController } from './checks/checks.controller';
// import { CompaniesController } from './companies/companies.controller';
// import { CompaniesService } from './companies/companies.service';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    PartnersModule,SalesModule,HttpModule,
    MongooseModule.forRoot(
        'mongodb://localhost:27017/DiamondPartnership',{useNewUrlParser: true}),
    ExpensesModule,
    ChecksModule,
    SeriousnessModule,
    CompaniesModule,
  ],
  controllers: [AppController,  ],//ChecksController,CompaniesController,
  providers: [AppService, ],//ChecksService, CompaniesService, 
})
export class AppModule {}
