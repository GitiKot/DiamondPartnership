import { Body, Controller, Get, Param, Post } from '@nestjs/common';


import { createSaleDto } from './dto/create-sale.dto';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
constructor(private salesService:SalesService){}

    @Post()
    async addSale(@Body() createSaleDto: createSaleDto) {
      return this.salesService.addSale(createSaleDto);
    }

    @Get()
    async getAllSales() {
        const sale = await this.salesService.getSales();
        return sale;
      }
    //   @Get(':id')
    //   getSale(@Param('id') saleId: string) {
    //     return this.salesService.getSingleSale(saleId);
    //   }

}
