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

    // @Patch(':id')
    // async updateChecks(

    //     @Param('id') exId: string,
    //     @Body('PublicSerialName') exPublicSerialName: string,
    //     @Body('date') exdate: Date,
    //     @Body('getchack') exgetchack: string,
    //     @Body('InvoiceNumber') exInvoiceNumber: number,
    //     @Body('Remarks') exRemarks: string,
    //     @Body('amount') examount: number,
    //     @Body('amountPartner') examountPartner: number,
    //     @Body('detail')exdetail:Array<{expenses:string,price:number}>,
    // ) {
    //     await this.checksService.update(exId,exPublicSerialName,exdate,exgetchack, exInvoiceNumber, exRemarks, examount, examountPartner,exdetail);
    //     return null;
    // }
   
    @Delete(':id')
    async removeProduct(@Param('id') chId: string) {
        await this.checksService.deleteChecks(chId);
        return null;
    }
    
}
