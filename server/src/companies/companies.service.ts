import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Companies } from './companies.model';
import { createCompaniesDto } from './dto/create-companies.dto';

@Injectable()
export class CompaniesService {
    constructor( @InjectModel('Companies') private readonly companiesModel: Model<Companies>,) { }

    addCompany(createCompaniesDto: createCompaniesDto): Promise<Companies> {
        const createExpenses = new this.companiesModel(createCompaniesDto);
        return createExpenses.save();
    }
    getCompanyByNameAndPassword(){

    }
    // getAllCompanies() {
    // }
   async updateCompany(
            id: string,
            nameCompany: string,
            password: string,
        ) {
            const updatedCompany = await this.findCompany(id);
            
            if (nameCompany) {
                updatedCompany.nameCompany = nameCompany;
            }
            if (password) {
                updatedCompany.password = password;
            }
            updatedCompany.save();
        }
    async  deleteCompany(comId: string) {
        const result = await this.companiesModel.deleteOne({ _id: comId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find company.');
        }
    }

    // async getCompany() {
    //     const company = await this.companiesModel.find().exec();
    //     return company.map(c => ({
    //         id: c.id,
    //         nameCompany: c.nameCompany,
    //         password: c.password,
    //     }))
    // }

    async getSingleCompany(ExpensesId: string) {
        const co = await this.findCompany(ExpensesId);
        return {
            id: co.id,
            nameCompany: co.nameCompany,
            password: co.password,
           
        };
    }

    private async findCompany(id: string): Promise<Companies> {
        let expenses;
        try {
            expenses = await this.companiesModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find company.');
        }
        if (!expenses) {
            throw new NotFoundException('Could not find company.');
        }
        return expenses;
    }
}
