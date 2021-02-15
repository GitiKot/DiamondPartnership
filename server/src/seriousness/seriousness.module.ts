import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeriousnessController } from './seriousness.controller';
import { SeriousnessSchema } from './seriousness.model';
import { seriousnessService } from './seriousness.service';


@Module({
    imports:[
        MongooseModule.forFeature([{ name: 'Seriousness', schema: SeriousnessSchema }]),
    ],
    controllers:[SeriousnessController],
    providers:[seriousnessService],
})
export class SeriousnessModule {}