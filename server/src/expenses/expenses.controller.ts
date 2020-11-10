import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { createExpensesDto } from './dto/create-expenses.dto';

@Controller('expenses')
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) { }
    @Post()
    async addExpenses(@Body() createExpensesDto: createExpensesDto) {
        return this.expensesService.addExpenses(createExpensesDto);
    }


    @Get()
    async getAllExpenses() {
        const expenses = await this.expensesService.getExpenses();
        console.log(expenses);
        
        return expenses;
    }

    @Get(':id')
    getExpenses(@Param('id') exId: string) {
        return this.expensesService.getSingleExpenses(exId);
    }

    @Patch(':id')
    async updateExpenses(

        @Param('id') exId: string,
        @Body('PublicSerialName') exPublicSerialName: string,
        @Body('date') exdate: Date,
        @Body('getchack') exgetchack: string,
        @Body('InvoiceNumber') exInvoiceNumber: number,
        @Body('Remarks') exRemarks: string,
        @Body('amount') examount: number,
        @Body('amountPartner') examountPartner: number,
        @Body('detail') exdetail:Array<{expenses:string;price:number}>,
    ) {
        await this.expensesService.updateExpenses(exId,exPublicSerialName,exdate,exgetchack, exInvoiceNumber, exRemarks, examount, examountPartner,exdetail)
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.expensesService.deleteExpenses(prodId);
        return null;
    }




}
