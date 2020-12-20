import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
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
  @Get()
  async findBySerailName(serialName: string) {
    const sale = await this.salesService.findBySerailName(serialName);
    return sale;
  }
  // @Get()
  // async findAllSales(pn:string) {
  //   const sale = await this.salesService.findSales(pn);
  //   return sale;
  // }
  @Patch(':id')
  async updateSale(

    @Param('id') sId: string,
    @Body('date') sdate: Date,
    @Body('numOfDate') snumOfDate: number,
    @Body('invoiceNumber') sinvoiceNumber: number,
    @Body('publicSerialName') spublicSerialName: string,
    @Body('privateSerialName') sprivateSerialName: string,
    @Body('stoneName') sstoneName: string,
    @Body('weight') sweight: number,
    @Body('pricePerCarat') spricePerCarat: number,
    @Body('rawOrPolished') srawOrPolished: string,
    @Body('isOpen') sisOpen: boolean,
  ) {
    console.log("uupdate controller");
    console.log("sisopen:");

    console.log(sisOpen);


    const sale = await this.salesService.updateSale(sId, sdate, snumOfDate, sinvoiceNumber, spublicSerialName,
      sprivateSerialName, sstoneName, sweight, spricePerCarat, srawOrPolished, sisOpen);
    console.log("update controller");
    return sale;
    // return this.salesService.updateSale(id, sale);
    // return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') saleId: string) {
    await this.salesService.deleteSale(saleId);
    return null;
  }
  // @Get(':id')
  // getSale(@Param('id') saleId: string) {
  //   return this.salesService.getSingleSale(saleId);
  // }



  // @Patch(':id')
  // async updatePartner(

  //   @Param('id') partId: string,
  //   @Body('name') partname: string,
  //   @Body('contact') partcontact: string,
  //   @Body('email') partemail: string,
  //   @Body('phone') parttel: string,
  //   @Body('fax') partfax: string,
  //   @Body('pel') partpel: string,
  //   @Body('Remarks') partRemarks: string,
  // ) {
  //   await this.partnerService.updatePartner(partId, partname, partcontact, partemail,parttel,partfax,partpel,partRemarks);
  //   return null;
  // }

  // @Delete(':id')
  // async removeProduct(@Param('id') prodId: string) {
  //     await this.partnerService.deletePartner(prodId);
  //     return null;
  // }

}
