import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { createUserDto } from './dto/create-user.dto';

@Injectable()
export class userService {
    constructor(
        @InjectModel('user') private readonly userModel: Model<User>,) { }

    async addUser(createUserDto: createUserDto): Promise<User> {
        const createUser = new this.userModel(createUserDto);
        return createUser.save();
    }
    async register(createUserDto: createUserDto): Promise<User> {
        const createUser = new this.userModel(createUserDto);
        return createUser.save();
    }
    async getUser() {
        const user = await this.userModel.find().exec();

        return user.map(u => ({
            papassword: u.password,
            userName: u.userName,
            id: u.id,
        }))
    }

    async getSingleUser(UserId: string) {
        const u = await this.findUser(UserId);
        return {
            userName: u.userName,
            id: u.id,
            password: u.password,
        };
    }

    async updateUser(
        id: string,
        userName: string,
        password: string,
    ) {  
        const updatedUser = await this.findUser(id);
        if (userName) {
            updatedUser.userName = userName;
        }
        if (password) {
            updatedUser.password = password;
        }
        updatedUser.save();
    }

    async deleteUser(uId: string) {
        const result = await this.userModel.deleteOne({ _id: uId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find Seriousness.');
        }
    }
    async findByUserName(userName: string) { 
        const userOne =  this.userModel.findOne({userName:userName}).exec();
     const u = (await userOne) 
        return   {   
            id: u.id,
            userName: u.userName,
            password: u.password,
        }    
    }
    // async findOne(username: string): Promise<User | undefined> {
    //     return this.user.find(user => user.username === username);
    //   }
    private async findUser(id: string): Promise<User> {
        let User;
        try {
            User = await this.userModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find Seriousness.');
        }
        if (!User) {
            throw new NotFoundException('Could not find Seriousness.');
        }
        return User;
    }

    
}
