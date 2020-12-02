import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import{createChecksDto} from 'src/checks/dto/create-check.dto';
import{Check} from 'src/checks/interface/check.interface';

@Injectable()
export class ChecksService {

    constructor(
        @InjectModel('check') private readonly checkModel: Model<Check>,) { }

    async addChecks(createChecksDto: createChecksDto): Promise<Check> {
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
    
    
    async deleteChecks(exId: string) {
        const result = await this.checkModel.deleteOne({ _id: exId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find Check.');
        }
    }

    private async findCheck(id: string): Promise<Check> {
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
