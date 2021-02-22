import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesController } from './companies.controller';
import { CompanySchema } from './companies.model';
import { CompaniesService } from './companies.service';

@Module({
   imports:[
       MongooseModule.forFeature([{ name: 'companeis', schema: CompanySchema }])],
   controllers:[CompaniesController],
   providers:[CompaniesService]
})
export class CompaniesModule {}