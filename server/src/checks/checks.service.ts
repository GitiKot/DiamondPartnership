import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createChecksDto } from 'src/checks/dto/create-check.dto';
import { Checks } from 'src/checks/interface/check.interface';

@Injectable()
export class ChecksService {

    constructor(
        @InjectModel('checks') private readonly checkModel: Model<Checks>,) { }

    async addChecks(createChecksDto: createChecksDto): Promise<Checks> {
        const createCheck = new this.checkModel(createChecksDto);
        return createCheck.save();
    }

    async getChecks() {
        const check = await this.checkModel.find().exec();
        return check.map(ch => ({
            id: ch.id,
            IdSales: ch.IdSales,
            numCheck: ch.numCheck,
            date: ch.date,
            sum: ch.sum,
            ReceiptOrInvoice: ch.ReceiptOrInvoice,
        }));
    }

    async getSingleCheck(checkId: string) {
        const ch = await this.findCheck(checkId);
        return {
            id: ch.id,
            IdSales: ch.IdSales,
            numCheck: ch.numCheck,
            date: ch.date,
            sum: ch.sum,
            ReceiptOrInvoice: ch.ReceiptOrInvoice,

        };
    }

    async updateCheck(
        id: string,
        IdSales: Array<string>,
        numCheck: number,
        date: Date,
        sum: number,
        ReceiptOrInvoice: string,

    ) {
        const updateCheck = await this.findCheck(id);
        if (IdSales) {
            updateCheck.IdSales = IdSales;
        }
        if (numCheck) {
            updateCheck.numCheck = numCheck;
        }
        if (date) {
            updateCheck.date = date;
        }
        if (sum) {
            updateCheck.sum = sum;
        } 
        if (ReceiptOrInvoice) {
            updateCheck.ReceiptOrInvoice = ReceiptOrInvoice;
        }

        updateCheck.save();
    }

    async deleteChecks(chId: string) {
        const result = await this.checkModel.deleteOne({ _id: chId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find Check.');
        }
    }

    private async findCheck(id: string): Promise<Checks> {
        let check;
        try {
            check = await this.checkModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find Check.');
        }
        if (!check) {
            throw new NotFoundException('Could not find Check.');
        }
        return check;
    }

}
