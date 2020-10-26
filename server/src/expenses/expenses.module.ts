import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpensesController } from './expenses.controller';
import { ExpensesSchema } from './expenses.model';
import { ExpensesService } from './expenses.service';


@Module({
    imports:[
        MongooseModule.forFeature([{ name: 'Expenses', schema: ExpensesSchema }]),
    ],
    controllers:[ExpensesController],
    providers:[ExpensesService],
})
export class ExpensesModule {}







