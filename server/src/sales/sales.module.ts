import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeriousnessSchema } from 'src/seriousness/seriousness.model';
import { SalesController } from './sales.controller';
import { SaleSchema } from './sales.model';
import { SalesService } from './sales.service';

@Module({
    imports:[MongooseModule.forFeature([{name:'Sale',schema:SaleSchema},
    {name:'Seriousness',schema:SeriousnessSchema}]),

],
controllers:[SalesController],
providers:[SalesService],
})
export class SalesModule {}
