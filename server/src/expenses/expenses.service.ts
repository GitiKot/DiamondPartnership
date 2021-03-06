import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expenses } from './interfaces/expenses.interface';
import { createExpensesDto } from './dto/create-expenses.dto';

@Injectable()
export class ExpensesService {
    constructor(
        @InjectModel('Expenses') private readonly expensesModel: Model<Expenses>,) { }

    async addExpenses(createExpensesDto: createExpensesDto): Promise<Expenses> {
        const createExpenses = new this.expensesModel(createExpensesDto);
        return createExpenses.save();
    }
    async getExpenses() {
        const Expenses = await this.expensesModel.find().exec();
        return Expenses.map(ex => ({
            id: ex.id,
            PublicSerialName: ex.PublicSerialName,
            date: ex.date,
            getchack: ex.getchack,
            InvoiceNumber: ex.InvoiceNumber,
            Remarks: ex.Remarks,
            amount: ex.amount,
            amountPartner: ex.amountPartner,
            detail: ex.detail.map(ex => ({
                expenses: ex.expenses,
                price: ex.price,
            }))
        }))
    }

    async getSingleExpenses(ExpensesId: string) {
        const ex = await this.findExpenses(ExpensesId);
        return {
            id: ex.id,
            PublicSerialName: ex.PublicSerialName,
            date: ex.date,
            getchack: ex.getchack,
            InvoiceNumber: ex.InvoiceNumber,
            Remarks: ex.Remarks,
            amount: ex.amount,
            amountPartner: ex.amountPartner,
            detail: ex.detail,
        };
    }

    async updateExpenses(
        id: string,
        PublicSerialName: string,
        date: Date,
        getchack: string,
        InvoiceNumber: number,
        Remarks: string,
        amount: number,
        amountPartner: number,
        detail:Array<{expenses:string,price:number}>
    ) {
        const updatedExpenses = await this.findExpenses(id);
        console.log("serv",amount);
        
        if (PublicSerialName) {
            updatedExpenses.PublicSerialName = PublicSerialName;
        }
        if (date) {
            updatedExpenses.date = date;
        }
        if (getchack) {
            updatedExpenses.getchack = getchack;
        } if (InvoiceNumber) {
            updatedExpenses.InvoiceNumber = InvoiceNumber;
        }
        if (Remarks) {
            updatedExpenses.Remarks = Remarks;
        }
        if (amount!=undefined) {
            updatedExpenses.amount = amount;
        }
        if (amountPartner) {
            updatedExpenses.amountPartner = amountPartner;
        }
        if (detail) {
            updatedExpenses.detail = detail;
        }
        updatedExpenses.save();
    }

    async deleteExpenses(exId: string) {
        const result = await this.expensesModel.deleteOne({ _id: exId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find expenses.');
        }
    }

    private async findExpenses(id: string): Promise<Expenses> {
        let expenses;
        try {
            expenses = await this.expensesModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find expenses.');
        }
        if (!expenses) {
            throw new NotFoundException('Could not find expenses.');
        }
        return expenses;
    }


}
