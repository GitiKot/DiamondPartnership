import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
<<<<<<< HEAD
<<<<<<< HEAD
import { seriousnessService } from './seriousness.service';
=======
// import { ExpensesService } from './seriousness.service';
>>>>>>> 2c6d992aa821914b05d1818e8fea09cae4ec29bc
=======
import { ExpensesService } from './seriousness.service';
>>>>>>> parent of e519a99... יום שלשי
import { createSeriousnessDto } from './dto/create-seriousness.dto';

@Controller('expenses')
<<<<<<< HEAD
<<<<<<< HEAD
export class SeriousnessController {
    constructor(private readonly seriousnessService: seriousnessService) { }
=======
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) { }
>>>>>>> parent of e519a99... יום שלשי
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
<<<<<<< HEAD
        await this.seriousnessService.deleteSeriousness(prodId);
=======
export class ExpensesController {
    // constructor(private readonly expensesService: ExpensesService) { }
    @Post()
    async addExpenses(@Body() createExpensesDto: createSeriousnessDto) {
        // return this.expensesService.addExpenses(createSeriousnessDto);
    }


    // @Get()
    // async getAllExpenses() {
    //     const expenses = await this.expensesService.getSeriousness();
    //     return expenses;
    // }

    // @Get(':id')
    // getExpenses(@Param('id') exId: string) {
    //     return this.seriousnessService.getSingleSeriousness(exId);
    // }

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
        // await this.expensesService.updateExpenses(exId,exPublicSerialName,exdate,exgetchack, exInvoiceNumber, exRemarks, examount, examountPartner);
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        // await this.expensesService.deleteExpenses(prodId);
>>>>>>> 2c6d992aa821914b05d1818e8fea09cae4ec29bc
=======
        await this.expensesService.deleteExpenses(prodId);
>>>>>>> parent of e519a99... יום שלשי
        return null;
    }




}
