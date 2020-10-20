import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnersModule } from './partners/partners.module';

@Module({
  imports: [
    PartnersModule,HttpModule,
    MongooseModule.forRoot(
        'mongodb://localhost:27017/DiamondPartnership',{useNewUrlParser: true}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
