import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { ObjectID } from 'mongodb';
// import { Patch } from '@nestjs/common/decorators/http/request-mapping.decorator';


import { createSaleDto } from './dto/create-sale.dto';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

  @Post()
  async addSale(@Body() createSaleDto: createSaleDto) {
    return this.salesService.addSale(createSaleDto);
  }

  @Get()
  async getAllSales() {
    const sale = await this.salesService.getSales();
    return sale;
  }

  @Get(':serialName')
  async findBySerailName(@Param('serialName') seria: string) {
    
    const sale = await this.salesService.findBySerailName(seria);
    return sale;
  }
  
  @Patch(':id')
  async updateSale(

    @Param('id') sId: string,
    @Body('date') sdate: Date,
    @Body('numOfDate') snumOfDate: number,
    @Body('invoiceNumber') sinvoiceNumber: number,
    @Body('publicSerialName') spublicSerialName: ObjectID,
    @Body('privateSerialName') sprivateSerialName: string,
    @Body('stoneName') sstoneName: string,
    @Body('weight') sweight: number,
    @Body('pricePerCarat') spricePerCarat: number,
    @Body('rawOrPolished') srawOrPolished: string,
    @Body('isOpen') sisOpen: boolean,
    @Body('sumPerPartner') ssumPerPartner: Number,

  ) {
   

    const sale = await this.salesService.updateSale(sId, sdate, snumOfDate, sinvoiceNumber, spublicSerialName,
      sprivateSerialName, sstoneName, sweight, spricePerCarat, srawOrPolished, sisOpen,ssumPerPartner);
    return sale;
   
  }

  @Delete(':id')
  async removeProduct(@Param('id') saleId: string) {
    await this.salesService.deleteSale(saleId);
    return null;
  }
  



 

  

}
