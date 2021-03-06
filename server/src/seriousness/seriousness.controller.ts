import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { seriousnessService } from './seriousness.service';
import { createSeriousnessDto } from './dto/create-seriousness.dto';
import { ObjectId } from 'mongodb';

@Controller('seriousness')
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

    @Patch(':id')
    async updateSeriousness(
        @Param('id') id: string,
        @Body('serialName') serialName: string,
        @Body('partner') partner: ObjectId,
        @Body('dateBuy') dateBuy: Date,
        @Body('cost') cost: number,
        @Body('amountReceived') amountReceived: number,
        @Body('partnersPercent') partnersPercent: number,
        @Body('AmountReceivedPartner') AmountReceivedPartner: number,
        @Body('finishDate') finishDate: Date,
        @Body('privateSeria') privateSeria: Array<{ namePrivate: string, price: number,
            expenses: Array<{ nameExpenses: string, exspensesPrice: number }> }>,

    ) {

        await this.seriousnessService.updateSeriousness(id, serialName,
            dateBuy, cost, amountReceived, partnersPercent, AmountReceivedPartner, finishDate, privateSeria, partner);
        return null;
    }
    @Get(':serialName')
    findBySerailName(@Param('serialName') serialName: string) {

        const ser = this.seriousnessService.findBySerailNameS(serialName);

        return ser;
    }


    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.seriousnessService.deleteSeriousness(prodId);
    }
}
