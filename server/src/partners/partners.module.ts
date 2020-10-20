import { Module } from '@nestjs/common';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnerSchema } from './partners.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Partner', schema: PartnerSchema }]),
  ],
  controllers: [PartnersController],
  providers: [PartnersService],
})
export class PartnersModule {}




