import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seriousness } from './interfaces/seriousness.interface';
import { createSeriousnessDto } from './dto/create-seriousness.dto';
import e from 'express';
import { ObjectId, ObjectID } from 'mongodb';

@Injectable()
export class seriousnessService {
    constructor(
        @InjectModel('Seriousness') private readonly seriousnessModel: Model<Seriousness>,) { }

    async addSeriousness(createSeriousnessDto: createSeriousnessDto): Promise<Seriousness> {
        const createSeriousness = new this.seriousnessModel(createSeriousnessDto);
        return createSeriousness.save();
    }
    async getSeriousness() {
        const Seriousness = await this.seriousnessModel.find().exec();
        return Seriousness.map(ex => ({
            partner:ex.partner,
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
                expenses:ps.expenses.map(e=>({
                    nameExpenses:e.nameExpenses,
                    price:e.price
                }))
            }))
        }));
    }
    
    // async getSingleSeriousness(SeriousnessId: string) {
    //     const ex = await this.findSeriousness(SeriousnessId);
    //     return {
    //         serialName: ex.serialName,
    //         id: ex.id,
    //         dateBuy: ex.dateBuy,
    //         cost: ex.cost,
    //         amountReceived: ex.amountReceived,
    //         partnersPercent: ex.partnersPercent,
    //         AmountReceivedPartner: ex.AmountReceivedPartner,
    //         finishDate: ex.finishDate,
    //         privateSeria: ex.privateSeria.map(ps => ({
    //             namePrivate: ps.namePrivate,
    //             price: ps.price,
    //             expenses:ps.expenses.map(e=>({
    //                 nameExpenses:e.nameExpenses,
    //                 price:e.price
    //             }))
    //         }))
            
    //     };
    // }

    
    // async updateSeriousness(

    //       id:string,
    //     serialName: string,
    //     dateBuy: Date,
    //     cost:number,
    //     amountReceived: number,
    //     partnersPercent:number,
    //     AmountReceivedPartner: number,
    //     finishDate:Date,
    //     privateSeria:Array<{namePrivate:string,price:number,expenses:Array<{nameExpenses:string,price:number}>}>,
    //     partner:ObjectId
        
    //   )  {
    //     const updatedSeriousness = await this.findSeriousness(id);
    //     if (serialName) {
    //         updatedSeriousness.serialName = serialName;
    //     }
    //     if (dateBuy) {
    //         updatedSeriousness.dateBuy = dateBuy;
    //     }
    //     if (cost) {
    //         updatedSeriousness.cost = cost;
    //     } if (amountReceived) {
    //         updatedSeriousness.amountReceived = amountReceived;
    //     }
    //     if (partnersPercent) {
    //         updatedSeriousness.partnersPercent = partnersPercent;
    //     }
    //     if (AmountReceivedPartner) {
    //         updatedSeriousness.AmountReceivedPartner = AmountReceivedPartner;
    //     }
    //     if (finishDate) {
    //         updatedSeriousness.finishDate = finishDate;
    //     }
    //     if (privateSeria) {
    //         updatedSeriousness.privateSeria = privateSeria;
    //     }
    //     if (partner) {
    //         updatedSeriousness.partner = partner;
    //     }
    //     updatedSeriousness.save();
    // }
// 
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


}
