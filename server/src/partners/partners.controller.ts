import { Controller, Post,  Body,   Get, Param,  Patch,Delete, } from '@nestjs/common';
import { createPartnerDto } from './dto/create-partner.dto';
import { PartnersService } from './partners.service';

@Controller('partners')
export class PartnersController {
    constructor(private readonly partnerService :PartnersService){}
    // @Post('/add')
    // async insertPartner(
    //   @Body('name') partname: string,
    //   @Body('contact') partcontact: string,
    //   @Body('email') partemail: string,
    //   @Body('phone') parttel: string,
    //   @Body('fax') partfax: string,
    //   @Body('pel') partpel: string,
    //   @Body('Remarks') partRemarks: string,
    // ) {
    //   const generatedId = await this.partnerService.insertPartner(
    //     partname,
    //     partcontact,
    //     partemail,parttel,partfax,partpel,partRemarks
    //   );
    //   return { id: generatedId };
    // }
   
    @Post()
    async addPartner(@Body() createPartnerDto: createPartnerDto) {
      return this.partnerService.addPartner(createPartnerDto);
    }
  

    @Get()
    async getAllPartners() {
      const products = await this.partnerService.getPartners();
      return products;
    }
  
    @Get(':id')
    getPartner(@Param('id') partId: string) {
      return this.partnerService.getSinglePartner(partId);
    }
  
    @Patch(':id')
    async updatePartner(
    
      @Param('id') partId: string,
      @Body('name') partname: string,
      @Body('contact') partcontact: string,
      @Body('email') partemail: string,
      @Body('phone') parttel: string,
      @Body('fax') partfax: string,
      @Body('pel') partpel: string,
      @Body('Remarks') partRemarks: string,
    ) {
      await this.partnerService.updatePartner(partId, partname, partcontact, partemail,parttel,partfax,partpel,partRemarks);
      return null;
    }
  
    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.partnerService.deletePartner(prodId);
        return null;
    }
}

