import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChecksController } from './checks.controller';
import { CheckSchema } from './checks.model';
import { ChecksService } from './checks.service';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: 'Seriousness', schema: CheckSchema }]),
    ],
    controllers:[ChecksController],
    providers:[ChecksService],
})
export class ChecksModule {}
