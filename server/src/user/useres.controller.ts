import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { ObjectID } from 'mongodb';
// import { Patch } from '@nestjs/common/decorators/http/request-mapping.decorator';


import { createUserDto } from './dto/create-user.dto';
import { UseresService } from './useres.service';

@Controller('users')
export class UseresController {
  constructor(private readonly UService: UseresService) { }

  @Post()
  async SingIn(@Body() createUserDto: createUserDto) {
    console.log("שלום מקונטרולר ",createUserDto);
    
    return this.UService.allowingAccess(createUserDto.password);
  }

  // @Get()
  // async getAllSales() {
  //   const sale = await this.salesService.getSales();
  //   return sale;
  // }

  // @Get(':serialName')
  // async findBySerailName(@Param('serialName') seria: string) {
    
  //   const sale = await this.salesService.findBySerailName(seria);
  //   return sale;
  // }
  
  @Patch(':id')
  async updateSale(

  


    @Param('id') sId: string,
    @Body('dateStart') sdate: Date,
    @Body('password') snumOfDate: string,
    @Body('AllowingAccess') sinvoiceNumber: string,
   

  ) {
   

    const sale = await this.UService.updateUser(sId, sdate, snumOfDate, sinvoiceNumber,
    );
    return sale;
   
  }

  @Delete(':id')
  async removeProduct(@Param('id') saleId: string) {
    await this.UService.deleteSale(saleId);
    return null;
  }
  



 

  

}
