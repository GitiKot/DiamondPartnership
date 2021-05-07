import { Injectable } from '@nestjs/common';
import { User } from './useres.model';
import { createUserDto } from 'src/user/dto/create-user.dto'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { StreamState } from 'http2';
import { pathToFileURL } from 'url';
import { match } from 'assert';
import { Seriousness } from 'src/seriousness/seriousness.model';
import { ObjectID } from 'mongodb';
@Injectable()
export class UseresService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Seriousness') private readonly seriousnessModel: Model<Seriousness>) { }

    async addUser(createSUeDto: createUserDto): Promise<User> {
        const createU = new this.userModel(createSUeDto);
        return createU.save();
    }
    async allowingAccess(u) {
        const user = this.getUserbyEmail(u);
        console.log("server user  ",user);
        
        return ((await user).AllowingAccess==u.AllowingAccess);
     
    }
    async getUserbyEmail(email) {
        const currectuEmail = this.userModel.findOne({ password: email }).exec();
        const u = (await currectuEmail)
        return {
            id: u.id,
            dateStart: u.dateStart,
            password: u.password,
            AllowingAccess: u.AllowingAccess
        }
    }


    async updateUser(
        id: string,
        dateStart: Date,
        password: string,
        AllowingAccess: string,


    ) {

        const updatedSale = await this.findUser(id);
        if (dateStart) {
            updatedSale.dateStart = dateStart;
        }
        if (password) {
            updatedSale.password = password;
        }
        if (AllowingAccess) {
            updatedSale.AllowingAccess = AllowingAccess;

        }

        updatedSale.save();

        return updatedSale;
    }

    async deleteSale(saleId: string) {
        const result = await this.userModel.deleteOne({ _id: saleId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find Partner.');
        }
    }


    private async findUser(id: string): Promise<User> {
        let sale;
        try {
            sale = await this.userModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find sale.');
        }
        if (!sale) {
            throw new NotFoundException('Could not find sale.');
        }
        return sale;
    }

}
