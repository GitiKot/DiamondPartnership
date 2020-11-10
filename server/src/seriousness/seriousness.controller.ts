import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ExpensesService } from './seriousness.service';
import { createSeriousnessDto } from './dto/create-seriousness.dto';

@Controller('expenses')
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) { }
    @Post()
    async addExpenses(@Body() createExpensesDto: createSeriousnessDto) {
        return this.expensesService.addExpenses(createSeriousnessDto);
    }


    @Get()
    async getAllExpenses() {
        const expenses = await this.expensesService.getSeriousness();
        return expenses;
    }

    @Get(':id')
    getExpenses(@Param('id') exId: string) {
        return this.seriousnessService.getSingleSeriousness(exId);
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
    ) {
        await this.expensesService.updateExpenses(exId,exPublicSerialName,exdate,exgetchack, exInvoiceNumber, exRemarks, examount, examountPartner);
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.expensesService.deleteExpenses(prodId);
        return null;
    }




}
