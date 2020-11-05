import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpensesController } from './seriousness.controller';
import { ExpensesSchema } from './seriousness.model';
import { ExpensesService } from './seriousness.service';


@Module({
    imports:[
        MongooseModule.forFeature([{ name: 'Expenses', schema: ExpensesSchema }]),
    ],
    controllers:[ExpensesController],
    providers:[ExpensesService],
})
export class ExpensesModule {}







