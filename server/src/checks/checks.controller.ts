import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ChecksService } from './checks.service';
import { createChecksDto } from './dto/create-check.dto';

@Controller('checks')
export class ChecksController {
    constructor(private readonly checksService: ChecksService) { }
    @Post()
    async addChecks(@Body() createChecksDto: createChecksDto) {
        return this.checksService.addChecks(createChecksDto);
    }

    @Get()
    async getAllChecks() {
        const checks = await this.checksService.getChecks();
        return checks;
    }
   
    @Get(':id')
    geChecks(@Param('id') chId: string) {
        return this.checksService.getSingleCheck(chId);
    } 

    @Patch(':id')
    async updateChecks(

        @Param('id') chId: string,
        @Body('IdSales') chIdSales: Array<string>,
        @Body('numCheck') chnumCheck: number,
        @Body('date') chdate: Date,
        @Body('sum') chsum: number,
        @Body('ReceiptOrInvoice') chReceiptOrInvoice: string,
       
    ) {
        await this.checksService.updateCheck(chId,chIdSales,chnumCheck,chdate, chsum, chReceiptOrInvoice);
        return null;
    }
   
    @Delete(':id')
    async removeProduct(@Param('id') chId: string) {
        await this.checksService.deleteChecks(chId);
        return null;
    }
    
}
