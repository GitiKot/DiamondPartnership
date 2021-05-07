import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeriousnessSchema } from 'src/seriousness/seriousness.model';
import { UseresController } from './useres.controller';
import { UserSchema } from './useres.model';
import { UseresService } from './useres.service';

@Module({
    imports:[MongooseModule.forFeature([{name:'User',schema:UserSchema},
    {name:'Seriousness',schema:SeriousnessSchema}]),

],
controllers:[UseresController],
providers:[UseresService],
})
export class UseresModule {}
