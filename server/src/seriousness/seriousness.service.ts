import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Seriousness } from './interfaces/seriousness.interface';
import { createSeriousnessDto } from './dto/create-seriousness.dto';
import e from 'express';
import { ObjectId } from 'mongodb';
import { findSourceMap } from 'module';

@Injectable()
export class seriousnessService {
    constructor(
        @InjectModel('Seriousness') private readonly seriousnessModel: Model<Seriousness>,) { }

    async addSeriousness(createSeriousnessDto: createSeriousnessDto): Promise<Seriousness> {
        const createSeriousness = new this.seriousnessModel(createSeriousnessDto);
        return createSeriousness.save();
    }

    async getSeriousness() {
        const Seriousness = await this.seriousnessModel.find().populate('partner').exec();

        return Seriousness.map(ex => ({
            partner: ex.partner,
            serialName: ex.serialName,
            id: ex.id,
            dateBuy: ex.dateBuy,
            cost: ex.cost,
            amountReceived: ex.amountReceived,
            partnersPercent: ex.partnersPercent,
            AmountReceivedPartner: ex.AmountReceivedPartner,
            finishDate: ex.finishDate,
            //privateSeria:Array<{namePrivate:string,price:number,expenses:Array<{nameExpenses:string,price:number}>}>;

            privateSeria: ex.privateSeria.map(ps => ({
                namePrivate: ps.namePrivate,
                price: ps.price,
                expenses: ps.expenses.map(e => ({
                    nameExpenses: e.nameExpenses,
                    exspensesPrice: e.exspensesPrice
                }))
            }))
        }));
    }

    async getSingleSeriousness(SeriousnessId: string) {
        const ex = await this.findSeriousness(SeriousnessId);
        return {
            serialName: ex.serialName,
            id: ex.id,
            dateBuy: ex.dateBuy,
            cost: ex.cost,
            amountReceived: ex.amountReceived,
            partnersPercent: ex.partnersPercent,
            AmountReceivedPartner: ex.AmountReceivedPartner,
            finishDate: ex.finishDate,
            privateSeria: ex.privateSeria.map(ps => ({
                namePrivate: ps.namePrivate,
                price: ps.price,
                expenses: ps.expenses.map(e => ({
                    nameExpenses: e.nameExpenses,
                    exspensesPrice: e.exspensesPrice
                }))
            }))

        };
    }


    async updateSeriousness(
        id: string,
        serialName: string,
        dateBuy: Date,
        cost: number,
        amountReceived: number,
        partnersPercent: number,
        AmountReceivedPartner: number,
        finishDate: Date,
        privateSeria: Array<{ namePrivate: string, price: number, expenses: Array<{ nameExpenses: string, exspensesPrice: number }> }>,
        partner: ObjectId

    ) {
        console.log("AmountReceivedPartner:",AmountReceivedPartner);
       
        const updatedSeriousness = await this.findSeriousness(id);
        if (serialName) {
            updatedSeriousness.serialName = serialName;
        }
        if (dateBuy) {
            updatedSeriousness.dateBuy = dateBuy;
        }
        if (cost) {
            updatedSeriousness.cost = cost;
        } if (amountReceived) {
            updatedSeriousness.amountReceived += amountReceived;
        }
        if (partnersPercent) {
            updatedSeriousness.partnersPercent = partnersPercent;
        }
        if (AmountReceivedPartner) {
            updatedSeriousness.AmountReceivedPartner += AmountReceivedPartner;
        }
        updatedSeriousness.finishDate = finishDate;
        if (privateSeria) {
            updatedSeriousness.privateSeria = privateSeria;
        }
        if (partner) {
            updatedSeriousness.partner =partner;
        }
        updatedSeriousness.save();
    }

    async findBySerailNameS(serialNameIs: string) { 
        const seriousnessOne =  this.seriousnessModel.findOne({serialName:serialNameIs}).exec();
     const v = (await seriousnessOne) 
        return   {   
            id: v.id,
            dateBuy: v.dateBuy,
            cost: v.cost,
            amountReceived: v.amountReceived,
            partnersPercent: v.partnersPercent,
            AmountReceivedPartner: v.AmountReceivedPartner,
            finishDate: v.finishDate,
            privateSeria: v.privateSeria.map(ps => ({
                namePrivate:ps.namePrivate,
                price: ps.price,
                expenses: ps.expenses.map(e => ({
                    nameExpenses: e.nameExpenses,
                    exspensesPrice: e.exspensesPrice
                }))
            }))

         };
    }

    async deleteSeriousness(exId: string) {
        const result = await this.seriousnessModel.deleteOne({ _id: exId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find Seriousness.');
        }
    }

    private async findSeriousness(id: string): Promise<Seriousness> {
        let Seriousness;
        try {
            Seriousness = await this.seriousnessModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find Seriousness.');
        }
        if (!Seriousness) {
            throw new NotFoundException('Could not find Seriousness.');
        }
        return Seriousness;
    }
    // import { Model } from 'mongoose';
    // import { Expenses } from './interfaces/seriousness.interface';
    // import { createExpensesDto } from './dto/create-expenses.dto';

    // @Injectable()
    // export class ExpensesService {
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


}
