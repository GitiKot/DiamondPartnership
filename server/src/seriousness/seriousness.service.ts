import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
<<<<<<< HEAD
import { Model } from 'mongoose';
import { Expenses } from './interfaces/seriousness.interface';
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
        }));
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
    ) {
        const updatedExpenses = await this.findExpenses(id);
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
        if (amount) {
            updatedExpenses.amount = amount;
        }
        if (amountPartner) {
            updatedExpenses.amountPartner = amountPartner;
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
=======
// import { Model } from 'mongoose';
// import { Expenses } from './interfaces/seriousness.interface';
// import { createExpensesDto } from './dto/create-expenses.dto';

@Injectable()
export class ExpensesService {
//     constructor(
//         @InjectModel('Expenses') private readonly expensesModel: Model<Expenses>,) { }

//     async addExpenses(createExpensesDto: createExpensesDto): Promise<Expenses> {
//         const createExpenses = new this.expensesModel(createExpensesDto);
//         return createExpenses.save();
//     }
//     async getExpenses() {
//         const Expenses = await this.expensesModel.find().exec();
//         return Expenses.map(ex => ({
//             id: ex.id,
//             PublicSerialName: ex.PublicSerialName,
//             date: ex.date,
//             getchack: ex.getchack,
//             InvoiceNumber: ex.InvoiceNumber,
//             Remarks: ex.Remarks,
//             amount: ex.amount,
//             amountPartner: ex.amountPartner,
//         }));
//     }

//     async getSingleExpenses(ExpensesId: string) {
//         const ex = await this.findExpenses(ExpensesId);
//         return {
//             id: ex.id,
//             PublicSerialName: ex.PublicSerialName,
//             date: ex.date,
//             getchack: ex.getchack,
//             InvoiceNumber: ex.InvoiceNumber,
//             Remarks: ex.Remarks,
//             amount: ex.amount,
//             amountPartner: ex.amountPartner,
//         };
//     }

//     async updateExpenses(
//         id: string,
//         PublicSerialName: string,
//         date: Date,
//         getchack: string,
//         InvoiceNumber: number,
//         Remarks: string,
//         amount: number,
//         amountPartner: number,
//     ) {
//         const updatedExpenses = await this.findExpenses(id);
//         if (PublicSerialName) {
//             updatedExpenses.PublicSerialName = PublicSerialName;
//         }
//         if (date) {
//             updatedExpenses.date = date;
//         }
//         if (getchack) {
//             updatedExpenses.getchack = getchack;
//         } if (InvoiceNumber) {
//             updatedExpenses.InvoiceNumber = InvoiceNumber;
//         }
//         if (Remarks) {
//             updatedExpenses.Remarks = Remarks;
//         }
//         if (amount) {
//             updatedExpenses.amount = amount;
//         }
//         if (amountPartner) {
//             updatedExpenses.amountPartner = amountPartner;
//         }
        
//         updatedExpenses.save();
//     }

//     async deleteExpenses(exId: string) {
//         const result = await this.expensesModel.deleteOne({ _id: exId }).exec();
//         if (result.n === 0) {
//             throw new NotFoundException('Could not find expenses.');
//         }
//     }

//     private async findExpenses(id: string): Promise<Expenses> {
//         let expenses;
//         try {
//             expenses = await this.expensesModel.findById(id).exec();
//         } catch (error) {
//             throw new NotFoundException('Could not find expenses.');
//         }
//         if (!expenses) {
//             throw new NotFoundException('Could not find expenses.');
//         }
//         return expenses;
//     }
>>>>>>> 2c6d992aa821914b05d1818e8fea09cae4ec29bc


}
