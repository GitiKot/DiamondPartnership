import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import {createCompaniesDto} from './dto/create-companies.dto';
@Controller('companies')
export class CompaniesController {
constructor(private companiesService:CompaniesService){}
@Post()
    async addCompany(@Body() createCompaniesDto: createCompaniesDto) {
        return this.companiesService.addCompany(createCompaniesDto);
    }
    // @Get()
    // async getAllCompanies() {
    //     const expenses = await this.expensesService.getExpenses();
    //     return expenses;
    // }

    @Get(':id')
    getCompany(@Param('id') comId: string) {
        return this.companiesService.getSingleCompany(comId);
    }

    @Patch(':id')
    async updateCAompany(

        @Param('id') comId: string,
        @Body('PublicSerialName') comNameCompany: string,
        @Body('date') compassword: string,
       
    ) {
        await this.companiesService.updateCompany(comId,comNameCompany,compassword);
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') comId: string) {
        await this.companiesService.deleteCompany(comId);
        return null;
    }

}
