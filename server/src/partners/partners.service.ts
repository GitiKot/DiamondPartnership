import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createPartnerDto } from './dto/create-partner.dto';
import { Partner } from './interfaces/partners.interface';

@Injectable()
export class PartnersService {

    constructor(
        @InjectModel('Partner') private readonly partnersModel: Model<Partner>,) { }
    
    async addPartner(createPartnerDto: createPartnerDto): Promise<Partner> {
        const createPartner = new this.partnersModel(createPartnerDto);
        return createPartner.save();
    }
    
    async getPartners() {
        const Partners = await this.partnersModel.find().exec();
        return Partners.map(part => ({
            id: part.id,
            name: part.name,
            contact: part.contact,
            email: part.email,
            phone: part.phone,
            fax: part.fax,
            pel: part.pel,
            Remarks: part.Remarks,
        }));
    }

    async getSinglePartner(PartnerId: string) {
        const Partner = await this.findPartner(PartnerId);
        return {
            id: Partner.id,
            name: Partner.name,
            contact: Partner.contact,
            email: Partner.email,
            phone: Partner.phone,
            fax: Partner.fax,
            pel: Partner.pel,
            Remarks: Partner.Remarks,
        };
    }

    async updatePartner(
        id: string,
        name: string,
        contact: string,
        email: string,
        phone: string,
        fax: string,
        pel: string,
        Remarks: string,
    ) {
        const updatedPartner = await this.findPartner(id);
        if (name) {
            updatedPartner.name = name;
        }
        if (contact) {
            updatedPartner.contact = contact;
        }
        if (email) {
            updatedPartner.email = email;
        } if (phone) {
            updatedPartner.phone = phone;
        }
        if (fax) {
            updatedPartner.fax = fax;
        }
        if (pel) {
            updatedPartner.pel = pel;
        }
        if (Remarks!=undefined) {
            updatedPartner.Remarks = Remarks;
        }
        updatedPartner.save();
    }

    async deletePartner(prodId: string) {
        const result = await this.partnersModel.deleteOne({ _id: prodId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find Partner.');
        }
    }

    private async findPartner(id: string): Promise<Partner> {
        let partner;
        try {
            partner = await this.partnersModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find Partner.');
        }
        if (!partner) {
            throw new NotFoundException('Could not find Partner.');
        }
        return partner;
    }
}


