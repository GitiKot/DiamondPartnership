import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeriousnessSchema } from 'src/seriousness/seriousness.model';
import { ChecksController } from './checks.controller';
import { CheckSchema } from './checks.model';
import { ChecksService } from './checks.service';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: 'checks', schema: CheckSchema }
      ,  {name:'Seriousness',schema:SeriousnessSchema}]),

    ],
    controllers:[ChecksController],
    providers:[ChecksService],
})
export class ChecksModule {}
