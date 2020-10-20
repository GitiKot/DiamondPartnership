import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SalesController } from './sales.controller';
import { SaleSchema } from './sales.model';
import { SalesService } from './sales.service';

@Module({
    imports:[MongooseModule.forFeature([{name:'sale',schema:SaleSchema}]),
],
controllers:[SalesController],
providers:[SalesService],
})
export class SalesModule {}
