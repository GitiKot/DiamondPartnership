import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
<<<<<<< HEAD
import { seriousnessService } from './seriousness.service';
=======
// import { ExpensesService } from './seriousness.service';
>>>>>>> 2c6d992aa821914b05d1818e8fea09cae4ec29bc
import { createSeriousnessDto } from './dto/create-seriousness.dto';
import { ObjectId } from 'mongodb';

@Controller('expenses')
<<<<<<< HEAD
export class SeriousnessController {
    constructor(private readonly seriousnessService: seriousnessService) { }
    @Post()
    async addSeriousness(@Body() createSeriousnessDto: createSeriousnessDto) {
        return this.seriousnessService.addSeriousness(createSeriousnessDto);
    }

    @Get()
    async getAllSeriousness() {
        const seriousness = await this.seriousnessService.getSeriousness();
        return seriousness;
    }

    // @Get(':id')
    // getSeriousness(@Param('id') exId: string) {
    //     return this.seriousnessService.getSingleSeriousness(exId);
    // }
//לא מעודכן
    // @Patch(':id')
    // async updateSeriousness(

        
      
    //     // parent:{type:mongoose.Schema.Types.ObjectId,ref:'Partner'},
    //     // privateSeria:Array<{namePrivate:string,price:number,expenses:Array<{nameExpenses:string,price:number}>}>;


    //     @Param('id') seId: string,
    //     @Body('serialName') serialName: string,
    //     @Body('partner') partner: ObjectId,
    //     @Body('dateBuy') dateBuy: Date,
    //     @Body('cost') cost: number,
    //     @Body('amountReceived') amountReceived: number,
    //     @Body('partnersPercent') partnersPercent: number,
    //     @Body('AmountReceivedPartner') AmountReceivedPartner: number,
    //     @Body('finishDate') finishDate: Date,
    //     @Body('privateSeria') privateSeria: Array<{namePrivate:string,price:number,expenses:Array<{nameExpenses:string,price:number}>}>,
        
    // ) {
    //     await this.seriousnessService.updateSeriousness(seId,serialName,
    //         dateBuy,cost, amountReceived, partnersPercent, AmountReceivedPartner, finishDate ,privateSeria,partner);
    //     return null;
    // }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
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
        return null;
    }




}
